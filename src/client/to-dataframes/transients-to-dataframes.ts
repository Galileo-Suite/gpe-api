
import { TransientsDocument } from '../queries/queries'
import { MutableDataFrame, FieldType, FieldDTO, FieldConfig } from '@grafana/data';

import {ResultOf} from '@graphql-typed-document-node/core'
import { GpeQuery } from '../../types';
import { itemFields, valueToField } from './utils/item-fields';


type SmallItems = ResultOf<typeof TransientsDocument>['items']
type Unarray<T> = T extends Array<infer U> ? U : T;
type SmallTransients = Unarray<SmallItems>['transient']
type SmallConfigs = Unarray<SmallItems>['configs']

interface Field<T> {
  name: string;
  type?: FieldType;
  config?: FieldConfig;
  values?: T[];
}

const itemToMetricFields = (metrics: SmallTransients, l = 1, prefix=""): Field<number | null>[] => {
  if (metrics.length == 0 ) {
    return []
  }

  const frames: MutableDataFrame<any>[]  = []
  const fields: Field<any>[] = []
  metrics.forEach(c=> {
    if (!c?.data) {
      return;
    }
    let values: (string | number | null)[] = c.pretty_data
    let type = FieldType.string
    if (c?.data && c?.data.length > 0) {
      values = c.data
      type = FieldType.number
    }
    if (c.label === "time") {
      values = c.data.map(f=>f? f*1000: null)
      type = FieldType.time
    }

    fields.push({
      name: c?.label ?? "",
      type,
      values,
    })
  })

  return fields
}

const itemToConfigFields = (configs: SmallConfigs, l?: number, prefix: string= ""): Field<string | null>[] => {
  if (configs.length == 0 ) {
    return []
  }

  return configs.map(m=>{
    const values = new Array(l).fill(m.tuple?.at(-1)?.value ?? null)

    return {
      name: `${prefix? prefix+ '_' : ''}${m.field}`,
      values,
      type: FieldType.string,
    }
  })
}

const itemToConfigFieldsBasedOnTime = (configs: SmallConfigs, timeField: (number|null)[], prefix: string= ""): FieldDTO<string | null>[] => {
  if (configs.length == 0 ) {
    return []
  }

  return configs.map(m=>{
    const values: (string | null)[] = []
    const tuples = m.tuple?.sort((a,b) => b.epoch - a.epoch)
    if (tuples) {
      values.push(
        ...timeField.map(t=>{
          const tup = tuples.find(tup => {
            if (tup.epoch <= (t??0)/1000) {
              return true
            }
            return false
          })
          return tup?.value ?? null
        })
      )
    }
    return {
      name: `${prefix? prefix+ '_' : ''}${m.field}`,
      values,
      type: FieldType.string,
    }

  })
}

export const transientsToDataFrames = (items: SmallItems | null | undefined, target: Partial<GpeQuery>): MutableDataFrame<any>[]  => {

  if (!items || items.length === 0 ) {
    return [new MutableDataFrame({fields:[]})]
  }

  const frames: MutableDataFrame<any>[] = []

  items.forEach(i => {
    const fields: FieldDTO<any>[] = []
    const name = `${i.label}_${i.id}`

    let l = 1
    if (i.transient.length !== 0) {
      const transient_max = i.transient[0].data.length // time length
      l = Math.max( transient_max, 1)
    }

    const metricsFeilds = itemToMetricFields(i.transient, l, i.item_type)
    const timefield = metricsFeilds.find(f=>f.type === FieldType.time)

    if (timefield === undefined) { //case when they dont requests metrics
      fields.push(
        ...valueToField(i.id, 'item_id', l),
        ...itemToConfigFields(i.configs,   l, i.item_type),
        ...metricsFeilds
      )
    } else {
      fields.push(
        ...valueToField(i.id, 'item_id', l),
        ...itemToConfigFieldsBasedOnTime(i.configs, timefield.values ?? [], i.item_type),
        ...metricsFeilds
      )
    }
    target.includedMetaData?.forEach(md=> {
      switch (md) {
        case 'refid': fields.push(...valueToField(target.refId, 'refid', l) ); break
        case 'type': fields.push(...valueToField(i.item_type, 'type', l) ); break
        case 'tags': fields.push(...valueToField(i.tags, 'tags', l) ); break
        case 'custom_tag': fields.push(...valueToField(target.custom_tags?.find(f=>f), 'custom_tags', l) ); break
      }
    })

    const frame = new MutableDataFrame({name, fields});
    frames.push(frame)
  })

  return frames
}
