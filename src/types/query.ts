import { DataQuery } from '@grafana/data';

export interface MyQuery extends DataQuery {
  types: string[]
  tags: string[]
  item_ids: string[]
  formulas: string[]
  configs: string[]
  summary: number
  func: string
}

export const defaultQuery: Partial<MyQuery> = {
  types: [],
  tags: [],
  item_ids: [],
  formulas: [],
  configs: [],
  summary: 1*60*60, // one hour
  func: 'AVG'
};
