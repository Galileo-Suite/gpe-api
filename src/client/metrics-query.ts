
import { Item, Metric, Config } from './queries/queries'
import { MutableDataFrame, FieldType, FieldDTO } from '@grafana/data';

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
      values, type: FieldType.string, config:{custom:{summary: m.summary}}
    }
  })
}

const itemToIDField = (item: Item, l = 1): FieldDTO<string>[] => {
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

export const metricsQuery = (items: Item[] | null | undefined): MutableDataFrame<any>[]  => {

  if (!items) return [new MutableDataFrame({fields:[]})]

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
