
import { Item, Metric, Config, ItemsWithMetricsDocument } from './queries/queries'
import { MutableDataFrame, FieldType, FieldDTO } from '@grafana/data';

import {ResultOf} from '@graphql-typed-document-node/core'


type SmallItems = ResultOf<typeof ItemsWithMetricsDocument>['items']
type Unarray<T> = T extends Array<infer U> ? U : T;

const itemToMetricFields = (metrics: Metric[], l = 1): FieldDTO<number | null>[] => {
  if (metrics.length == 0 ) {
    return []
  }

  return metrics.map(m=>{
    let values = m.data
    if (values.length === 0 ) {
      values = new Array(l).fill(null)
    }
    return {
      name: `${m.formula}`,
      values, type: FieldType.number, config:{custom:{summary: m.summary}}
    }
  })
}

const itemToConfigFields = (configs: Config[], l = 1): FieldDTO<string | null>[] => {
  if (configs.length == 0 ) {
    return []
  }

  return configs.map(m=>{
    let values = m.data
    if (values.length === 0 ) {
      values = new Array(l).fill(null)
    }
    return {
      name: `${m.field}`,
      values, 
      type: FieldType.string, 
      config:{custom:{summary: m.summary}}
    }
  })
}

const itemToTransientFields = (transient: Unarray<SmallItems>['transient'], l = 1): FieldDTO<string | null>[] => {
  if (!transient || transient.length == 0 ) {
    return []
  }
  const fields = transient[0].fields
  return fields.map((f,i)=>{
    const values = transient.map(t => t.values[i] )
    return {
      name: `${f}`,
      values, 
      type: FieldType.string 
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

const itemToTimeField = (data: Metric[] | Config[], l = 1): FieldDTO<any>[]  => {
  if (data.length == 0 ) {
    return []
  }
  const m = data[0]
  const timeValues = new Array(l).fill(null).map((_,i)=>  {
    return  m.start_epoch*1000 + i*m.summary*1000
  })
  const time = { name: 'time',  values: timeValues, type: FieldType.time }
  return [time]
}

export const metricsQuery = (items: SmallItems | null | undefined): MutableDataFrame<any>[]  => {

  if (!items) return [new MutableDataFrame({fields:[]})]
  if (items[0].transient && items[0].transient.length > 0) {
    const frames: MutableDataFrame<any>[] = []
    items.forEach(i=> {
      console.log(itemToTransientFields(i.transient, 1))
      const frame = new MutableDataFrame({
        name: `${i.label}_${i.id}`,
        fields: [
          ...itemToIDField(i, i.transient?.length ?? 1),
          ...itemToTransientFields(i.transient, 1)
        ]
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
    if (metrics.length ===0 && configs.length === 0)  {
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
    const fields = [
      ...itemToTimeField(metrics.length == 0 ? configs : metrics, l),
      ...itemToIDField(i, l),
      ...itemToMetricFields(metrics, l),
      ...itemToConfigFields(configs, l)
    ]
    const frame = new MutableDataFrame({
      name: `${i.label}_${i.id}`,
      fields
    });
    frames.push(frame)
    return frame
  })

  return frames
}
