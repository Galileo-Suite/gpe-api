declare module '@galileo-suite/gpe-api/client/make-node-apollo-client' {
  import { ApolloClient, NormalizedCacheObject } from "@apollo/client/core";
  interface makeApolloClientOptions {
      url: string;
      token: string;
  }
  export const makeNodeApolloClient: ({ url, token }: makeApolloClientOptions) => ApolloClient<NormalizedCacheObject>;
  export {};

}
declare module '@galileo-suite/gpe-api/client/metrics-query' {
  import { Item } from '@galileo-suite/gpe-api/client/queries/queries';
  import { MutableDataFrame } from '@grafana/data';
  export const metricsQuery: (items: Item[] | null | undefined) => MutableDataFrame<any>[];

}
declare module '@galileo-suite/gpe-api/client/queries/queries' {
  import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
  export type Maybe<T> = T | null;
  export type InputMaybe<T> = Maybe<T>;
  export type Exact<T extends {
      [key: string]: unknown;
  }> = {
      [K in keyof T]: T[K];
  };
  export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
      [SubKey in K]?: Maybe<T[SubKey]>;
  };
  export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
      [SubKey in K]: Maybe<T[SubKey]>;
  };
  /** All built-in and custom scalars, mapped to their actual values */
  export type Scalars = {
      ID: string;
      String: string;
      Boolean: boolean;
      Int: number;
      Float: number;
  };
  export type Config = {
      __typename?: 'Config';
      data: Array<Maybe<Scalars['String']>>;
      field: Scalars['String'];
      start_epoch: Scalars['Int'];
      summary: Scalars['Int'];
  };
  export type Item = {
      __typename?: 'Item';
      alias?: Maybe<Scalars['String']>;
      configs: Array<Config>;
      id: Scalars['ID'];
      item_type: Scalars['String'];
      key?: Maybe<Scalars['String']>;
      label: Scalars['String'];
      metrics: Array<Metric>;
      relatives?: Maybe<Array<ItemInfo>>;
      reporting?: Maybe<Scalars['Boolean']>;
      tags?: Maybe<Array<Scalars['String']>>;
  };
  export type ItemConfigsArgs = {
      epoch_end: Scalars['Int'];
      epoch_start: Scalars['Int'];
      fields: Array<Scalars['String']>;
      samples?: InputMaybe<Scalars['Int']>;
      summary?: InputMaybe<Scalars['Int']>;
  };
  export type ItemMetricsArgs = {
      epoch_end: Scalars['Int'];
      epoch_start: Scalars['Int'];
      formulas: Array<Scalars['String']>;
      samples?: InputMaybe<Scalars['Int']>;
      summary?: InputMaybe<Scalars['Int']>;
  };
  export type ItemRelativesArgs = {
      custom_tags?: InputMaybe<Array<Scalars['String']>>;
      epoch_end: Scalars['Int'];
      epoch_start: Scalars['Int'];
      item_ids?: InputMaybe<Array<Scalars['ID']>>;
      tags?: InputMaybe<Array<Scalars['String']>>;
      types?: InputMaybe<Array<Scalars['String']>>;
  };
  export type ItemInfo = {
      __typename?: 'ItemInfo';
      alias?: Maybe<Scalars['String']>;
      id: Scalars['ID'];
      item_type: Scalars['String'];
      key?: Maybe<Scalars['String']>;
      label: Scalars['String'];
      reporting?: Maybe<Scalars['Boolean']>;
      tags?: Maybe<Array<Scalars['String']>>;
  };
  export type Metric = {
      __typename?: 'Metric';
      data: Array<Maybe<Scalars['Float']>>;
      formula: Scalars['String'];
      function: Scalars['String'];
      start_epoch: Scalars['Int'];
      summary: Scalars['Int'];
  };
  export type Query = {
      __typename?: 'Query';
      items: Array<Item>;
      type_ahead: TypeAhead;
  };
  export type QueryItemsArgs = {
      custom_tags?: InputMaybe<Array<Scalars['String']>>;
      epoch_end: Scalars['Int'];
      epoch_start: Scalars['Int'];
      item_ids?: InputMaybe<Array<Scalars['ID']>>;
      related_to?: InputMaybe<Array<Selector>>;
      tags?: InputMaybe<Array<Scalars['String']>>;
      types?: InputMaybe<Array<Scalars['String']>>;
  };
  export type QueryType_AheadArgs = {
      custom_tags?: InputMaybe<Array<Scalars['String']>>;
      epoch_end: Scalars['Int'];
      epoch_start: Scalars['Int'];
      item_ids?: InputMaybe<Array<Scalars['ID']>>;
      tags?: InputMaybe<Array<Scalars['String']>>;
      types?: InputMaybe<Array<Scalars['String']>>;
  };
  export type Selector = {
      custom_tags?: InputMaybe<Array<Scalars['String']>>;
      item_ids?: InputMaybe<Array<Scalars['ID']>>;
      tags?: InputMaybe<Array<Scalars['String']>>;
      types?: InputMaybe<Array<Scalars['String']>>;
  };
  export type TypeAhead = {
      __typename?: 'TypeAhead';
      config_fields?: Maybe<Array<Scalars['String']>>;
      custom_tags?: Maybe<Array<Scalars['String']>>;
      formulas?: Maybe<Array<Scalars['String']>>;
      item_ids?: Maybe<Array<Scalars['ID']>>;
      tags?: Maybe<Array<Scalars['String']>>;
      types?: Maybe<Array<Scalars['String']>>;
  };
  export type ItemsWithMetricsQueryVariables = Exact<{
      epoch_start: Scalars['Int'];
      epoch_end: Scalars['Int'];
      types?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
      tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
      custom_tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
      item_ids?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
      related_to_types: Array<Scalars['String']> | Scalars['String'];
      related_to_tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
      related_to_custom_tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
      related_to_item_ids?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
      configs: Array<Scalars['String']> | Scalars['String'];
      formulas: Array<Scalars['String']> | Scalars['String'];
      summary?: InputMaybe<Scalars['Int']>;
      samples?: InputMaybe<Scalars['Int']>;
  }>;
  export type ItemsWithMetricsQuery = {
      __typename?: 'Query';
      items: Array<{
          __typename: 'Item';
          id: string;
          item_type: string;
          tags?: Array<string> | null;
          label: string;
          configs: Array<{
              __typename?: 'Config';
              start_epoch: number;
              summary: number;
              field: string;
              data: Array<string | null>;
          }>;
          metrics: Array<{
              __typename: 'Metric';
              start_epoch: number;
              summary: number;
              formula: string;
              data: Array<number | null>;
              function: string;
          }>;
      }>;
  };
  export type ConfigsFragment = {
      __typename?: 'Item';
      configs: Array<{
          __typename?: 'Config';
          start_epoch: number;
          summary: number;
          field: string;
          data: Array<string | null>;
      }>;
  };
  export type MetricsFragment = {
      __typename: 'Item';
      metrics: Array<{
          __typename: 'Metric';
          start_epoch: number;
          summary: number;
          formula: string;
          data: Array<number | null>;
          function: string;
      }>;
  };
  export type GetCustomTagsQueryVariables = Exact<{
      epoch_start: Scalars['Int'];
      epoch_end: Scalars['Int'];
  }>;
  export type GetCustomTagsQuery = {
      __typename?: 'Query';
      type_ahead: {
          __typename?: 'TypeAhead';
          custom_tags?: Array<string> | null;
      };
  };
  export type GetTypesQueryVariables = Exact<{
      custom_tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
      epoch_start: Scalars['Int'];
      epoch_end: Scalars['Int'];
  }>;
  export type GetTypesQuery = {
      __typename?: 'Query';
      type_ahead: {
          __typename?: 'TypeAhead';
          types?: Array<string> | null;
      };
  };
  export type GetTagsQueryVariables = Exact<{
      custom_tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
      types?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
      epoch_start: Scalars['Int'];
      epoch_end: Scalars['Int'];
  }>;
  export type GetTagsQuery = {
      __typename?: 'Query';
      type_ahead: {
          __typename?: 'TypeAhead';
          tags?: Array<string> | null;
      };
  };
  export type GetItemsQueryVariables = Exact<{
      custom_tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
      types?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
      tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
      item_ids?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
      epoch_start: Scalars['Int'];
      epoch_end: Scalars['Int'];
  }>;
  export type GetItemsQuery = {
      __typename?: 'Query';
      items: Array<{
          __typename?: 'Item';
          id: string;
          label: string;
      }>;
  };
  export type GetConfigsQueryVariables = Exact<{
      custom_tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
      types?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
      tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
      item_ids?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
      epoch_start: Scalars['Int'];
      epoch_end: Scalars['Int'];
  }>;
  export type GetConfigsQuery = {
      __typename?: 'Query';
      type_ahead: {
          __typename?: 'TypeAhead';
          config_fields?: Array<string> | null;
      };
  };
  export type GetFormulasQueryVariables = Exact<{
      custom_tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
      types?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
      tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
      item_ids?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
      epoch_start: Scalars['Int'];
      epoch_end: Scalars['Int'];
  }>;
  export type GetFormulasQuery = {
      __typename?: 'Query';
      type_ahead: {
          __typename?: 'TypeAhead';
          types?: Array<string> | null;
          formulas?: Array<string> | null;
      };
  };
  export const ConfigsFragmentDoc: DocumentNode<ConfigsFragment, unknown>;
  export const MetricsFragmentDoc: DocumentNode<MetricsFragment, unknown>;
  export const ItemsWithMetricsDocument: DocumentNode<ItemsWithMetricsQuery, Exact<{
      epoch_start: Scalars['Int'];
      epoch_end: Scalars['Int'];
      types?: InputMaybe<string | string[]> | undefined;
      tags?: InputMaybe<string | string[]> | undefined;
      custom_tags?: InputMaybe<string | string[]> | undefined;
      item_ids?: InputMaybe<string | string[]> | undefined;
      related_to_types: Array<Scalars['String']> | Scalars['String'];
      related_to_tags?: InputMaybe<string | string[]> | undefined;
      related_to_custom_tags?: InputMaybe<string | string[]> | undefined;
      related_to_item_ids?: InputMaybe<string | string[]> | undefined;
      configs: Array<Scalars['String']> | Scalars['String'];
      formulas: Array<Scalars['String']> | Scalars['String'];
      summary?: InputMaybe<number> | undefined;
      samples?: InputMaybe<number> | undefined;
  }>>;
  export const GetCustomTagsDocument: DocumentNode<GetCustomTagsQuery, Exact<{
      epoch_start: Scalars['Int'];
      epoch_end: Scalars['Int'];
  }>>;
  export const GetTypesDocument: DocumentNode<GetTypesQuery, Exact<{
      custom_tags?: InputMaybe<string | string[]> | undefined;
      epoch_start: Scalars['Int'];
      epoch_end: Scalars['Int'];
  }>>;
  export const GetTagsDocument: DocumentNode<GetTagsQuery, Exact<{
      custom_tags?: InputMaybe<string | string[]> | undefined;
      types?: InputMaybe<string | string[]> | undefined;
      epoch_start: Scalars['Int'];
      epoch_end: Scalars['Int'];
  }>>;
  export const GetItemsDocument: DocumentNode<GetItemsQuery, Exact<{
      custom_tags?: InputMaybe<string | string[]> | undefined;
      types?: InputMaybe<string | string[]> | undefined;
      tags?: InputMaybe<string | string[]> | undefined;
      item_ids?: InputMaybe<string | string[]> | undefined;
      epoch_start: Scalars['Int'];
      epoch_end: Scalars['Int'];
  }>>;
  export const GetConfigsDocument: DocumentNode<GetConfigsQuery, Exact<{
      custom_tags?: InputMaybe<string | string[]> | undefined;
      types?: InputMaybe<string | string[]> | undefined;
      tags?: InputMaybe<string | string[]> | undefined;
      item_ids?: InputMaybe<string | string[]> | undefined;
      epoch_start: Scalars['Int'];
      epoch_end: Scalars['Int'];
  }>>;
  export const GetFormulasDocument: DocumentNode<GetFormulasQuery, Exact<{
      custom_tags?: InputMaybe<string | string[]> | undefined;
      types?: InputMaybe<string | string[]> | undefined;
      tags?: InputMaybe<string | string[]> | undefined;
      item_ids?: InputMaybe<string | string[]> | undefined;
      epoch_start: Scalars['Int'];
      epoch_end: Scalars['Int'];
  }>>;

}
declare module '@galileo-suite/gpe-api/gpe-api' {
  import { makeNodeApolloClient } from '@galileo-suite/gpe-api/client/make-node-apollo-client';
  import { ItemsWithMetricsQueryVariables } from '@galileo-suite/gpe-api/client/queries/queries';
  import { DataTransformerConfig, ScopedVars } from '@grafana/data';
  import { GpeTarget, GrafanaDashboard } from '@galileo-suite/gpe-api/types/index';
  import { HighchartsPanelOptions } from '@galileo-suite/gpe-api/types/index';
  export class GpeApi {
      client: ReturnType<typeof makeNodeApolloClient>;
      constructor(client: ReturnType<typeof makeNodeApolloClient>);
      grafanaQuery: (variables: ItemsWithMetricsQueryVariables) => Promise<import("@grafana/data").MutableDataFrame<any>[]>;
      mockGrafana: (targets: GpeTarget[], transformations: DataTransformerConfig[], panelOptions: HighchartsPanelOptions, range: GrafanaDashboard['time'], scopedVars?: ScopedVars) => Promise<import("highcharts").Options>;
      grafanaChart: (key: string, dashboard: GrafanaDashboard) => Promise<import("highcharts").Options>;
  }

}
declare module '@galileo-suite/gpe-api/grafana-api' {
  import { Axios } from 'axios';
  import { GrafanaApiConfig, GrafanaDashboard } from '@galileo-suite/gpe-api/types/index';
  export class GrafanaApi {
      axios: Axios;
      config: GrafanaApiConfig;
      constructor(config: GrafanaApiConfig);
      getDashboard: (dashboardUid: string) => Promise<GrafanaDashboard>;
  }

}
declare module '@galileo-suite/gpe-api/index' {
  export * from '@galileo-suite/gpe-api/client/metrics-query';
  export * from '@galileo-suite/gpe-api/client/make-node-apollo-client';
  export * from '@galileo-suite/gpe-api/client/queries/queries';
  export * from '@galileo-suite/gpe-api/types/index';
  export * from '@galileo-suite/gpe-api/gpe-api';
  export * from '@galileo-suite/gpe-api/grafana-api';

}
declare module '@galileo-suite/gpe-api/transformers/fieldToConfigMapping/fieldToConfigMapping' {
  import { DataFrame, FieldConfig, ReducerID, Field } from '@grafana/data';
  export interface FieldToConfigMapping {
      fieldName: string;
      reducerId?: ReducerID;
      handlerKey: string | null;
  }
  /**
   * Transforms a frame with fields to a map of field configs
   *
   * Input
   * | Unit        | Min | Max |
   * --------------------------------
   * | Temperature |  0  | 30  |
   * | Pressure    |  0  | 100 |
   *
   * Outputs
   * {
      { min: 0, max: 100 },
   * }
   */
  export function getFieldConfigFromFrame(frame: DataFrame, rowIndex: number, evaluatedMappings: EvaluatedMappingResult): FieldConfig;
  interface FieldToConfigContext {
      mappingValues?: any[];
      mappingColors?: string[];
      mappingTexts?: string[];
  }
  type FieldToConfigMapHandlerProcessor = (value: any, config: FieldConfig, context: FieldToConfigContext) => any;
  export interface FieldToConfigMapHandler {
      key: string;
      targetProperty?: string;
      name?: string;
      processor: FieldToConfigMapHandlerProcessor;
      defaultReducer?: ReducerID;
  }
  export enum FieldConfigHandlerKey {
      Name = "field.name",
      Value = "field.value",
      Label = "field.label",
      Ignore = "__ignore"
  }
  export const configMapHandlers: FieldToConfigMapHandler[];
  export function getConfigMapHandlersIndex(): Record<string, FieldToConfigMapHandler>;
  export function getConfigHandlerKeyForField(fieldName: string, mappings: FieldToConfigMapping[]): string | null;
  export function lookUpConfigHandler(key: string | null): FieldToConfigMapHandler | null;
  export interface EvaluatedMapping {
      automatic: boolean;
      handler: FieldToConfigMapHandler | null;
      reducerId: ReducerID;
  }
  export interface EvaluatedMappingResult {
      index: Record<string, EvaluatedMapping>;
      nameField?: Field;
      valueField?: Field;
  }
  export function evaluteFieldMappings(frame: DataFrame, mappings: FieldToConfigMapping[], withNameAndValue?: boolean): EvaluatedMappingResult;
  export {};

}
declare module '@galileo-suite/gpe-api/transformers/prepareTimeSeries/prepareTimeSeries' {
  import { SynchronousDataTransformerInfo, DataFrame } from '@grafana/data';
  export type Labels = Record<string, string>;
  /**
   * There is currently an effort to figure out consistent names
   * for the various formats/types we produce and use.
   *
   * This transformer will eventually include the required metadata that can assert
   * a DataFrame[] is of a given type
   *
   * @internal -- TBD
   */
  export enum timeSeriesFormat {
      TimeSeriesWide = "wide",
      TimeSeriesMany = "many",
      TimeSeriesLong = "long"
  }
  export type PrepareTimeSeriesOptions = {
      format: timeSeriesFormat;
  };
  /**
   * Convert to [][time,number]
   */
  export function toTimeSeriesMany(data: DataFrame[]): DataFrame[];
  export function toTimeSeriesLong(data: DataFrame[]): DataFrame[];
  export const prepareTimeSeriesTransformer: SynchronousDataTransformerInfo<PrepareTimeSeriesOptions>;

}
declare module '@galileo-suite/gpe-api/transformers/rowsToFields/rowsToFields' {
  import { DataFrame, DataTransformerInfo } from '@grafana/data';
  import { FieldToConfigMapping } from '@galileo-suite/gpe-api/transformers/fieldToConfigMapping/fieldToConfigMapping';
  export interface RowToFieldsTransformOptions {
      nameField?: string;
      valueField?: string;
      mappings?: FieldToConfigMapping[];
  }
  export const rowsToFieldsTransformer: DataTransformerInfo<RowToFieldsTransformOptions>;
  export function rowsToFields(options: RowToFieldsTransformOptions, data: DataFrame): DataFrame;

}
declare module '@galileo-suite/gpe-api/types/grafana' {
  import { GpeTarget, HighchartsPanelOptions } from '@galileo-suite/gpe-api/types/index';
  import { DataTransformerConfig } from '@grafana/data';
  export interface GrafanaApiConfig {
      url: string;
      token: string;
  }
  export interface GrafanaDashboard {
      panels: Panel[];
      title: string;
      time: {
          from: string;
          to: string;
      };
  }
  export interface Panel {
      targets: GpeTarget[];
      transformations: DataTransformerConfig[];
      options: HighchartsPanelOptions;
      [key: string]: any;
  }

}
declare module '@galileo-suite/gpe-api/types/index' {
  export * from '@galileo-suite/gpe-api/types/query';
  export * from '@galileo-suite/gpe-api/types/panel';
  export * from '@galileo-suite/gpe-api/types/grafana';

}
declare module '@galileo-suite/gpe-api/types/panel' {
  import Highcharts from 'highcharts';
  export type SupportedHighchartsTypes = 'line' | 'pie' | 'custom';
  export type HighchartOptions = {
      [key in SupportedHighchartsTypes]: Highcharts.Options;
  };
  export type ConversionFunctions = {
      [key in SupportedHighchartsTypes]: string;
  };
  export interface HighchartsPanelOptions {
      key: string;
      highchartsType: SupportedHighchartsTypes;
      highchartOptions: HighchartOptions;
      conversionFunction: ConversionFunctions;
      useDarkTheme?: boolean;
      usePanelDimensions?: boolean;
  }
  export const defaultHighchartsPieOptions: Highcharts.Options;
  export const defaultHighchartsSeriesOptions: Highcharts.Options;
  export const defaultHighchartsPanelOptions: HighchartsPanelOptions;

}
declare module '@galileo-suite/gpe-api/types/query' {
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
  export interface GpeQuery extends GpeTarget, DataQuery {
  }
  export const defaultGpeQuery: Partial<GpeQuery>;
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

}
declare module '@galileo-suite/gpe-api/utils/build-item-with-metric-vars' {
  import { ScopedVars } from '@grafana/data';
  import { GpeQuery } from '@galileo-suite/gpe-api/types/query';
  import { ItemsWithMetricsQueryVariables } from '@galileo-suite/gpe-api/client/queries/queries';
  export const applyGrafanaVars: <T>(object: T, scopedVars: ScopedVars) => T;
  export const buildItemWithMetricsVars: (target: Partial<GpeQuery>, { epoch_start, epoch_end }: {
      epoch_start: number;
      epoch_end: number;
  }, scopedVars?: ScopedVars) => ItemsWithMetricsQueryVariables;

}
declare module '@galileo-suite/gpe-api/utils/dark-highcharts-theme' {
  export const darkHighchartsTheme: Highcharts.Options;

}
declare module '@galileo-suite/gpe-api/utils/execute-transforms' {
  import { DataFrame, DataTransformerConfig, MutableDataFrame } from '@grafana/data';
  export const executeTransforms: (frames: MutableDataFrame[], transformations: DataTransformerConfig[]) => Promise<DataFrame[]>;

}
declare module '@galileo-suite/gpe-api/utils/get-scoped-vars' {
  import { ScopedVars } from '@grafana/data';
  export const getScopedVars: () => ScopedVars;

}
declare module '@galileo-suite/gpe-api/utils/highchart-object-from-data-panel-options' {
  import { DataFrame } from '@grafana/data';
  import Highcharts from 'highcharts';
  import { HighchartsPanelOptions } from '@galileo-suite/gpe-api/types/index';
  export const highchartObjectFromDataPanelOptions: (data: DataFrame[], options: HighchartsPanelOptions) => Highcharts.Options;

}
declare module '@galileo-suite/gpe-api/utils/highcharts-line-from-dataframe' {
  import { DataFrame } from '@grafana/data';
  import Highcharts from 'highcharts';
  export const highchartsLineFromDataFrame: (dataframes: DataFrame[]) => Highcharts.Options;

}
declare module '@galileo-suite/gpe-api/utils/highcharts-pie-from-dataframe' {
  import { DataFrame } from '@grafana/data';
  import Highcharts from 'highcharts';
  export const highchartsPieFromDataFrame: (dataframes: DataFrame[]) => Highcharts.Options;

}
declare module '@galileo-suite/gpe-api/utils/index' {
  export * from '@galileo-suite/gpe-api/utils/highchart-object-from-data-panel-options';
  export * from '@galileo-suite/gpe-api/utils/highcharts-line-from-dataframe';
  export * from '@galileo-suite/gpe-api/utils/highcharts-pie-from-dataframe';
  export * from '@galileo-suite/gpe-api/utils/dark-highcharts-theme';
  export * from '@galileo-suite/gpe-api/utils/build-item-with-metric-vars';
  export * from '@galileo-suite/gpe-api/utils/execute-transforms';
  export * from '@galileo-suite/gpe-api/utils/get-scoped-vars';

}
declare module '@galileo-suite/gpe-api/utils/unwrap-optional-time-range' {
  import { TimeRange } from '@grafana/data';
  export const unwrapOptionalTimeRange: (range?: TimeRange) => {
      epoch_start: number;
      epoch_end: number;
  };

}
declare module '@galileo-suite/gpe-api' {
  import main = require('@galileo-suite/gpe-api/dist/index');
  export = main;
}