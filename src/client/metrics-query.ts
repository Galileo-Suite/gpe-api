
import { Item, Metric, Config, ItemsWithMetricsDocument, TransientRow } from './queries/queries'
import { MutableDataFrame, FieldType, FieldDTO } from '@grafana/data';

import {ResultOf} from '@graphql-typed-document-node/core'
import { GpeQuery, GpeTarget } from 'src/types';


type SmallItems = ResultOf<typeof ItemsWithMetricsDocument>['items']
type Unarray<T> = T extends Array<infer U> ? U : T;

const itemToMetricFields = (metrics: Metric[], l = 1, prefix=""): FieldDTO<number | null>[] => {
  if (metrics.length == 0 ) {
    return []
  }

  return metrics.map(m=>{
    let values = m.data
    if (values.length === 0 ) {
      values = new Array(l).fill(null)
    }
    return {
      name: `${prefix? prefix+'_' : ''}${m.formula}`,
      values, type: FieldType.number, config:{custom:{summary: m.summary}}
    }
  })
}

const itemToConfigFields = (configs: Config[], l = 1, prefix: string= ""): FieldDTO<string | null>[] => {
  if (configs.length == 0 ) {
    return []
  }

  return configs.map(m=>{
    let values = m.data
    if (values.length === 0 ) {
      values = new Array(l).fill(null)
    }
    return {
      name: `${prefix? prefix+ '_' : ''}${m.field}`,
      values,
      type: FieldType.string,
      config:{custom:{summary: m.summary}}
    }
  })
}

const itemToRecentConfigFields = (configs: Config[], l = 1, prefix: string = ""): FieldDTO<string | null>[] => {
  if (configs.length == 0 ) {
    return []
  }
  const fields: FieldDTO<string | null>[] = []
  configs.forEach(m=>{
    if ( !m.tuple ) {
      return null;
    }
    const values = new Array(l).fill(m.tuple[0].value ?? null)
    fields.push({
      name: `${prefix? prefix+'_' : ''}${m.field}`,
      values,
      type: FieldType.string,
      config:{custom:{summary: m.summary}}
    })
  })
  return fields
}

const itemToTransientFields = (transient: Unarray<SmallItems>['transient'], l = 1, prefix: string = ""): (FieldDTO<string | null> | FieldDTO<number | null>)[] => {
  if (!transient || transient.length == 0 ) {
    return []
  }
  const fields = transient[0].fields
  return fields.filter((f,i)=> !(f === 'poll_epoch_ns' || f === 'sort_id')).map((f,i)=>{ //chalking sort_id
    if (f?.slice(0,3) === "Cfg") {
      const values = transient.map(t => t.values[fields.indexOf(f)])
      return {
        name: `${prefix? prefix+'_' : ''}${f}`,
        values,
        type: FieldType.string
      }
    } else {
      const values: (number|null)[] = transient.map(t => {
        const v = t.values[fields.indexOf(f)]
        if (v===null) {
          return v
        }
        return parseFloat(v)
      })
      return {
        name: `${f}`,
        values,
        type: FieldType.number
      }
    }
  })
}

const valueToField = (value: string | string[] | undefined | null, name: string, l = 1): FieldDTO<string>[] => {
  return [{
    name,
    values: new Array(l).fill(value),
    type: FieldType.string,
  }]
}
const itemToTimeField = (item:Unarray<SmallItems>, l = 1): FieldDTO<any>[]  => {
  let data: Metric[] | Config[] | TransientRow[]
  if ('metrics' in item && item.metrics.length > 0) {
    data = item.metrics
  } else if ('configs' in item && item.configs.length > 0 ) {
    data = item.configs
  } else if ('transient' in item && item.transient && item.transient.length > 0 ) {
    data = item.transient
  } else {
    data = []
  }

  if (data.length == 0 ) {
    return []
  }
  let d = data[0]
  if (d.__typename === 'TransientRow') {
    const d = data as TransientRow[]
    const timeValues = d.map(d=>d.values[1] ? parseInt(d.values[1])/1000/1000 : null)
    const time = { name: 'time',  values: timeValues, type: FieldType.time }
    return [time]
  }

  if (d.__typename === 'Metric' || d.__typename === 'Config') {
    const m = d as Metric | Config
    const timeValues = new Array(l).fill(null).map((_,i)=>  {
      return  m.start_epoch*1000 + i*m.summary*1000
    })
    const time = { name: 'time',  values: timeValues, type: FieldType.time }
    return [time]
  }
  return []
}

export const metricsQuery = (items: SmallItems | null | undefined, target: GpeTarget): MutableDataFrame<any>[]  => {

  if (!items || items.length === 0 ) {
    return [new MutableDataFrame({fields:[]})]
  }

  const frames: MutableDataFrame<any>[] = []

  items.forEach(i => {
    //finding height of table
    let l = 1
    const metrics_max = Math.max(...i.metrics.map(m=>m.data.length))
    const configs_max = Math.max(...i.configs.map(m=>m.data.length))
    const transient_max = i.transient ? i.transient.length : 0
    l = Math.max(metrics_max, transient_max)
    l = l == 0? 1 : l
    console.log(l,JSON.parse(JSON.stringify(i)))

    const fields: FieldDTO<any>[] = [
      ...valueToField(i.id, "item_id", l),
      ...valueToField(i.item_type, "type", l),
      ...valueToField(i.tags, "tags", l),
    ]
    if (target.custom_tags.length == 1 ) { // adding this check because its technically only enforced ui wise
      fields.push(valueToField(target.custom_tags[0], "custom_tag", l)[0])
    }

    if (i.metrics.length === 0 && i.configs.length === 0 && i.transient && i.transient.length === 0)  {
      const frame = new MutableDataFrame({
        name: `${i.label}_${i.id}`,
        fields,
      });
      frames.push(frame)
      return;
    }
    fields.push(
      ...itemToTimeField(i, l),
      ...itemToConfigFields(i.configs, l, i.item_type)
    )

    if (target.request_type === 'transient') {
      fields.push(
        ...itemToTransientFields(i.transient, 1, i.transient?.find(f=>true)?.type ?? "")
      )
    } else if (target.request_type === 'metrics') {
      fields.push(
        ...itemToMetricFields(i.metrics, l, i.item_type),
      )
    }
    console.log(fields)

    const frame = new MutableDataFrame({
      name: `${i.label}_${i.id}`,
      fields
    });
    frames.push(frame)
  })

  return frames
}
