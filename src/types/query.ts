
import { DataQuery, DataSourceJsonData } from '@grafana/data';

export interface GpeTarget {
  variable: 'types' | 'tags' | 'item_ids' | 'custom_tags' | undefined;
  use_related_to: boolean;

  types: string[] | null;
  tags: string[];
  custom_tags: string[];
  item_ids: string[];
  formulas: string[];
  configs: string[];
  summary: number | null;
  samples: number | null;

  related_to_types: string[] | null;
  related_to_tags: string[];
  related_to_custom_tags: string[];
  related_to_item_ids: string[];
}

export interface GpeQuery extends GpeTarget, DataQuery {}

export const defaultGpeQuery: Partial<GpeQuery> = {
  variable: 'item_ids',
  use_related_to: false,

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
