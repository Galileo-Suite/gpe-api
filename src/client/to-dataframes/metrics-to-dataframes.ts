
import { Metric, Config, ItemsWithMetricsDocument } from '../queries/queries'
import { MutableDataFrame, FieldType, FieldDTO } from '@grafana/data';

import {ResultOf} from '@graphql-typed-document-node/core'
import { Formula, GpeQuery } from '../../types';

import {itemFields, valueToField} from './utils/item-fields'


type SmallItems = ResultOf<typeof ItemsWithMetricsDocument>['items']
type Unarray<T> = T extends Array<infer U> ? U : T;
type SmallMetrics = Unarray<SmallItems>['metrics']
type SmallConfigs = Unarray<SmallItems>['configs']

export const MetricFields = (metrics: Metric[], l = 1, prefix="", formulas?: GpeQuery['formulas']): FieldDTO<number | string | null>[] => {
  if (metrics.length == 0 ) {
    return []
  }

  const returnMetrics:FieldDTO<number | null | string>[] = []
  metrics.forEach(m=>{
    let values: (string | number | null)[] = m.pretty_data
    let type = FieldType.string
    let unit = ""
    if (m?.data && m?.data.length > 0) {
      values = m.data
      type = FieldType.number
    }
    if (m.unit === "epoch") {
      values = m.data.map(f=> f? f*1000: null)
      type = FieldType.time
    }
    if (values.length === 0 ) {
      values = new Array(l).fill(null)
    }

    //this is what grafana uses for bytes (EIC) aka 1024
    if (unit == "iB"){
      unit = 'bytes'
    }
    if (unit == "iB/s"){
      unit = 'bytes/s'
    }
    if (m.unit == "number") {
      unit = ""
    }

    //finding the target that matches current formula
    const formula = formulas?.find(f=>typeof f ==='object' ? f.formula === m.formula : false )

    let name = `${prefix? prefix+'_' : ''}${m.formula}`
    if ('label' in m && m.label && m.label !== '') {
      name = m.label
    }
    if (typeof formula === 'object' && formula?.nameAs) {
      name = formula.nameAs
    }

    returnMetrics.push({
      name,
      values,
      type, config:{custom:{summary: m.summary}, unit}
    })

    const forecast = m.forecast
    if (forecast){
      returnMetrics.pop() //use forecast acutal because it has the extra null that make the field the right hight to match the time col
      returnMetrics.shift() // remove time array
      returnMetrics.unshift({ // add time array from forecast
        name:'time',
        values: forecast.time.map(f=>(f??0)*1000),
        type: FieldType.time
      })
      returnMetrics.push({
        name,
        values: forecast?.actual,
        type: FieldType.number,
         config:{custom:{summary: m.summary, unit, fcastKey: name}},
      })
      returnMetrics.push({
        name:`${name}_forecast`,
        values: forecast.forecast,
        type: FieldType.number,
        config:{custom:{summary: m.summary, unit, fcastKey: name}}
      })
      returnMetrics.push({
        name:`${name}_lower`,
        values: forecast.lower,
        type: FieldType.number,
        config:{custom:{summary: m.summary, unit, fcastKey: name}}
      })
      returnMetrics.push({
        name:`${name}_uppper`,
        values: forecast.upper,
        type: FieldType.number,
        config:{custom:{summary: m.summary, unit, fcastKey: name}}
      })
    }
  })
  return returnMetrics
}

const itemToConfigFields = (configs: Config[], l?: number, prefix: string= ""): FieldDTO<string | null>[] => {
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

const itemToTimeField = (item: Unarray<SmallItems>, l = 1): FieldDTO<any>[]  => {
  let data: SmallMetrics | SmallConfigs
  if ('metrics' in item && item.metrics.length > 0) {
    data = item.metrics
  } else if ('configs' in item && item.configs.length > 0 ) {
    data = item.configs
  } else {
    return []
  }

  const d = data[0]

  const timeValues: (number | null)[] = new Array(l).fill(null).map((_,i)=>  {
    return  (d.start_epoch??Date.now()/1000 - 24*60*60)*1000 + i*(d.summary??300)*1000
  })
  let time = [{ name: 'time',  values: timeValues, type: FieldType.time }]

  if (d.__typename === 'Metric') {
    const forecast = d.forecast
    if (forecast){
      const timeValues = forecast.time.map(t=>t? t*1000 : null)
      time = [{ name: 'time',  values: timeValues, type: FieldType.time }]
    }
  }
  return time
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
      ...MetricFields(i.metrics, l, undefined, target.formulas)
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
