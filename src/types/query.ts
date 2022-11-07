
import { DataQuery, DataSourceJsonData } from '@grafana/data';

export type MetaFields = 'refid' | "item_id" | "type" | "tags" | "custom_tag" | undefined
export type Formula = {formula:string, nameAs: string | null}
export type Unarray<T> = T extends Array<infer U> ? U : T;

export interface GpeTarget {
  variable: 'types' | 'tags' | 'item_ids' | 'custom_tags' | undefined;
  use_related_to: boolean;
  request_type: 'metrics' | 'transient' | 'visualization'
  includedMetaData?: MetaFields[]

  types: string[];
  tags: string[];
  custom_tags: string[];
  item_ids: string[];
  item_regex: string;
  formulas: (Formula | string)[];
  configs: string[];
  summary: number | null | string;
  samples: number | null | string;

  related_to_types: string[];
  related_to_tags: string[];
  related_to_custom_tags: string[];
  related_to_item_ids: string[];
  related_to_item_regex: string;

  transient_type: string
  transient_fields: string[]
  transient_where: string,

  vis_id: string[]
  filters: string
  function: "AVG" | "MAX" | "MIN"

  use_forecast: boolean
  frequency: string
  periods: string
  flexibility: string
}

export interface GpeQuery extends GpeTarget, DataQuery {}

export const defaultGpeQuery: Omit<GpeQuery, 'refId'> = {
  variable: 'item_ids',
  use_related_to: false,
  request_type: 'visualization',

  types: [],
  tags: [],
  custom_tags: [],
  item_ids: [],
  item_regex: "",
  formulas: [],
  configs: [],
  summary: 1 * 60 * 60, // one hour
  samples: null, // one hour

  related_to_types: [],
  related_to_tags: [],
  related_to_custom_tags: [],
  related_to_item_ids: [],
  related_to_item_regex: "",

  transient_type: '',
  transient_fields: [],
  transient_where: "",

  vis_id: [],
  filters: "",
  function: "AVG",

  use_forecast: false,
  frequency: '1D',
  periods: '30',
  flexibility:' 0.05',
};


/**
 * These are options configured for each DataSource instance
 */
export interface MyDataSourceOptions extends DataSourceJsonData {
  gpeGraphqlEndpoint?: string;
}

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
export interface MySecureJsonData {
  token?: string;
}
