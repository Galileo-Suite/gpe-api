
import { TransientsDocument } from '../queries/queries'
import { MutableDataFrame, FieldType, FieldDTO } from '@grafana/data';

import {ResultOf} from '@graphql-typed-document-node/core'
import { GpeQuery } from '../../types';
import { itemFields } from './utils/item-fields';


type SmallItems = ResultOf<typeof TransientsDocument>['items']
type Unarray<T> = T extends Array<infer U> ? U : T;
type SmallTransients = Unarray<SmallItems>['transient']
type SmallConfigs = Unarray<SmallItems>['configs']

const itemToMetricFields = (metrics: SmallTransients, l = 1, prefix=""): FieldDTO<number | null>[] => {
  if (metrics.length == 0 ) {
    return []
  }

  // return metrics.map(m=>{
    //   let values = m.data
    //   if (values.length === 0 ) {
      //     values = new Array(l).fill(null)
      //   }
      //   const field = {
        //     name: `${prefix? prefix+'_' : ''}${m.label}`,
        //     values,
        //     type: FieldType.number,
        //   }

        //   return field
        // })

  const frames: MutableDataFrame<any>[]  = []
  const fields: FieldDTO<any>[] = []
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

const itemToConfigFields = (configs: SmallConfigs, l?: number, prefix: string= ""): FieldDTO<string | null>[] => {
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

export const transientsToDataFrames = (items: SmallItems | null | undefined, target: Partial<GpeQuery>): MutableDataFrame<any>[]  => {

  if (!items || items.length === 0 ) {
    return [new MutableDataFrame({fields:[]})]
  }

  const frames: MutableDataFrame<any>[] = []

  items.forEach(i => {
    if (i.transient.length === 0) {
      const frame = new MutableDataFrame({
        name: `${i.label}_${i.id}`,
        fields:  itemFields(i, target, 1)
      });
      frames.push(frame)
      return;
    }
    //finding height of table
    const transient_max = i.transient[0].data.length // time length
    const l = Math.max( transient_max, 1)

    const fields: FieldDTO<any>[] = itemFields(i, target, l)

    fields.push(
      ...itemToConfigFields(i.configs,   l, i.item_type),
      ...itemToMetricFields(i.transient, l, i.item_type),
    )

    const frame = new MutableDataFrame({
      name: `${i.label}_${i.id}`,
      fields
    });
    frames.push(frame)
  })

  return frames
}