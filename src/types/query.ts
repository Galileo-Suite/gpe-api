
import { DataQuery, DataSourceJsonData } from '@grafana/data';

export interface GpeTarget {
  variable: 'types' | 'tags' | 'item_ids' | 'custom_tags' | undefined;
  use_related_to: boolean;
  request_type: 'metrics' | 'transient' | 'visualization'

  types: string[];
  tags: string[];
  custom_tags: string[];
  item_ids: string[];
  formulas: string[];
  configs: string[];
  summary: number | null;
  samples: number | null;

  related_to_types: string[];
  related_to_tags: string[];
  related_to_custom_tags: string[];
  related_to_item_ids: string[];

  transient_type: string
  transient_fields: string[]
  transient_where: string,

  vis_id: string[]
}

export interface GpeQuery extends GpeTarget, DataQuery {}

export const defaultGpeQuery: Partial<GpeQuery> = {
  variable: 'item_ids',
  use_related_to: false,
  request_type: 'metrics',

  types: [],
  tags: [],
  custom_tags: [],
  item_ids: [],
  formulas: [],
  configs: [],
  summary: 1 * 60 * 60, // one hour
  samples: null, // one hour

  related_to_types: [],
  related_to_tags: [],
  related_to_custom_tags: [],
  related_to_item_ids: [],

  transient_type: '',
  transient_fields: [],
  transient_where: "",

  vis_id: []
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
