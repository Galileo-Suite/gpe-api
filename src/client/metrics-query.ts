
import { Item, Metric, Config, ItemsWithMetricsDocument, TransientRow } from './queries/queries'
import { MutableDataFrame, FieldType, FieldDTO } from '@grafana/data';

import {ResultOf} from '@graphql-typed-document-node/core'


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

const itemToIDField = (item: Unarray<SmallItems>, l = 1): FieldDTO<string>[] => {
  return [{
    name: "item_id",
    values: new Array(l).fill(item.id),
    type: FieldType.string,
  }]
}

const itemToTimeField = (data: Metric[] | Config[] | TransientRow[], l = 1): FieldDTO<any>[]  => {
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

export const renameDuplicateFields = (fields:FieldDTO<any>[] ) => {
  const h:{[key:string]: [number,number]} = {}
  fields.forEach((f,i)=> {
    if (f.name in h) {
      fields[ h[f.name][0] ].name = `${f.name} ${0}`
      h[f.name][1] += 1
      f.name = `${f.name} ${h[f.name][1]-1}`
    } else {
      h[f.name] = [i,1]
    }
  })
  return fields
}

export const metricsQuery = (items: SmallItems | null | undefined): MutableDataFrame<any>[]  => {

  if (!items || items.length === 0 ) return [new MutableDataFrame({fields:[]})]

  if (Math.max(...items.map(i=>i.transient?.length ?? 0)) > 0) {
    const frames: MutableDataFrame<any>[] = []
    items.forEach(i=> {
      const frame = new MutableDataFrame({
        name: `${i.label}_${i.id}`,

        fields: renameDuplicateFields([
          ...itemToTimeField(i.transient ?? [], 1),
          ...itemToIDField(i, i.transient?.length ?? 1),
          ...itemToRecentConfigFields(i.configs, i.transient?.length ?? 1, i.item_type),
          ...itemToTransientFields(i.transient, 1, i.transient?.find(f=>true)?.type ?? "")
        ])
      });
      frames.push(frame)
    })
    return frames
  }

  const frames: MutableDataFrame<any>[] = []
  items.forEach(i => {
    let l = 1
    const metrics = i.metrics
    const configs = i.configs
    if (metrics.length === 0 && configs.length === 0)  {
      const frame = new MutableDataFrame({
        name: `${i.label}_${i.id}`,
        fields: [
          ...itemToIDField(i, 1)
        ]
      });
      frames.push(frame)
      return;
    }
    const metrics_max = Math.max(...metrics.map(m=>m.data.length))
    const configs_max = Math.max(...configs.map(m=>m.data.length))
    l = Math.max(metrics_max,configs_max)
    l = l == 0? 1 : l
    const fields = renameDuplicateFields([
      ...itemToTimeField(metrics.length == 0 ? configs : metrics, l),
      ...itemToIDField(i, l),
      ...itemToMetricFields(metrics, l, i.item_type),
      ...itemToConfigFields(configs, l, i.item_type)
    ])
    const frame = new MutableDataFrame({
      name: `${i.label}_${i.id}`,
      fields
    });
    frames.push(frame)
  })

  return frames
}
