
import { Metric, Config, ItemsWithMetricsDocument } from '../queries/queries'
import { MutableDataFrame, FieldType, FieldDTO } from '@grafana/data';

import {ResultOf} from '@graphql-typed-document-node/core'
import { Formula, GpeQuery } from '../../types';

import {itemFields, valueToField} from './utils/item-fields'


type SmallItems = ResultOf<typeof ItemsWithMetricsDocument>['items']
type Unarray<T> = T extends Array<infer U> ? U : T;
type SmallMetrics = Unarray<SmallItems>['metrics']
type SmallConfigs = Unarray<SmallItems>['configs']

const itemToMetricFields = (metrics: SmallMetrics, l = 1, prefix="", formulas?: GpeQuery['formulas']): FieldDTO<number | null>[] => {
  if (metrics.length == 0 ) {
    return []
  }

  return metrics.map(m=>{
    let values = m.data
    if (values.length === 0 ) {
      values = new Array(l).fill(null)
    }
    //finding the target that matches current formula
    const formula = formulas?.find(f=>typeof f ==='object' ? f.formula === m.formula : false )

    let name = `${prefix? prefix+'_' : ''}${m.formula}`
    if (typeof formula === 'object' && formula?.nameAs) {
      name = formula.nameAs
    }

    return {
      name,
      values, type: FieldType.number, config:{custom:{summary: m.summary}}
    }
  })
}

const itemToConfigFields = (configs: SmallConfigs, l?: number, prefix: string= ""): FieldDTO<string | null>[] => {
  if (configs.length == 0 ) {
    return []
  }

  return configs.map(m=>{
    let values = m.data
    if (values.length === 0 ) {
      values = new Array(l).fill(null)
    } else if (values.length !== l) {
      values = new Array(l).fill(m.tuple?.at(-1)?.value ?? null)
    }
    return {
      name: `${prefix? prefix+ '_' : ''}${m.field}`,
      values,
      type: FieldType.string,
      config:{custom:{summary: m.summary}}
    }
  })
}

const itemToTimeField = (item:Unarray<SmallItems>, l = 1): FieldDTO<any>[]  => {
  let data: SmallMetrics | SmallConfigs
  if ('metrics' in item && item.metrics.length > 0) {
    data = item.metrics as SmallMetrics
  } else if ('configs' in item && item.configs.length > 0 ) {
    data = item.configs
  } else {
    data = []
  }

  if (data.length == 0 ) {
    return []
  }
  let d = data[0]

  if (d.__typename === 'Metric' || d.__typename === 'Config') {
    const m = d as Metric | Config
    const timeValues = new Array(l).fill(null).map((_,i)=>  {
      return  (m.start_epoch??Date.now()/1000 - 24*60*60)*1000 + i*(m.summary??300)*1000
    })
    const time = { name: 'time',  values: timeValues, type: FieldType.time }
    return [time]
  }
  return []
}

export const metricsToDataFrames = (items: SmallItems | null | undefined, target: Partial<GpeQuery>): MutableDataFrame<any>[]  => {

  if (!items || items.length === 0 ) {
    return [new MutableDataFrame({fields:[]})]
  }

  const frames: MutableDataFrame<any>[] = []

  items.forEach(i => {
    //finding height of table
    const metrics_max = Math.max(...i.metrics.map(m=>m.data.length))
    const configs_max = Math.max(...i.configs.map(m=>m.data.length))
    const l = Math.max(metrics_max, configs_max,1)

    const fields: FieldDTO<any>[] = []

    if (i.metrics.length === 0 && i.configs.length === 0)  {
      const frame = new MutableDataFrame({
        name: `${i.label}_${i.id}`,
        fields,
      });
      frames.push(frame)
      return;
    }
    fields.push(
      ...itemToTimeField(i, l),
      ...itemToConfigFields(i.configs, l),
      ...itemToMetricFields(i.metrics, l, undefined, target.formulas)
    )

    target.includedMetaData?.forEach(md=> {
      switch (md) {
        case 'refid': fields.push(...valueToField(target.refId, 'refid', l) ); break
        case 'custom_tag': fields.push(...valueToField(target.custom_tags?.find(f=>f), 'custom_tags', l) ); break
        case 'type': fields.push(...valueToField(i.item_type, 'type', l) ); break
        case 'tags': fields.push(...valueToField(i.tags, 'tags', l) ); break
        case 'item_id': fields.push(...valueToField(i.id, 'item_id', l) ); break
      }
    })

    const frame = new MutableDataFrame({
      name: `${i.label}_${i.id}`,
      fields
    });
    frames.push(frame)
  })

  return frames
}
