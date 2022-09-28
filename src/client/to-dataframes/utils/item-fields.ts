import { GpeQuery } from '../../../types'
import {Item } from '../../queries/queries'
import { FieldDTO, FieldType } from '@grafana/data'


const valueToField = (value: string | string[] | undefined | null, name: string, l = 1): FieldDTO<string>[] => {
  return [{
    name,
    values: new Array(l).fill(value),
    type: FieldType.string,
  }]
}


export const itemFields = (i: Pick<Item, 'id'| 'item_type' | 'tags'>, target: Partial<GpeQuery>, l:number):FieldDTO<any>[] => {
  const fields: FieldDTO<any>[] = [
    ...valueToField(i.id, "item_id", l),
    ...valueToField(i.item_type, "type", l),
    ...valueToField(i.tags, "tags", l),
  ]
  if (target.custom_tags?.length == 1 ) { // adding this check because its technically only enforced ui wise
    fields.push(valueToField(target.custom_tags[0], "custom_tag", l)[0])
  }
  return fields
}
