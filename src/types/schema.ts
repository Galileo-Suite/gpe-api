export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Chart = {
  __typename?: 'Chart';
  columns: Array<Maybe<Metric>>;
  title?: Maybe<Scalars['String']>;
};

export type Config = {
  __typename?: 'Config';
  data: Array<Maybe<Scalars['String']>>;
  field: Scalars['String'];
  start_epoch: Scalars['Int'];
  summary: Scalars['Int'];
  tuple?: Maybe<Array<StringTuple>>;
  value?: Maybe<Scalars['String']>;
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
  relative_metrics: Array<Metric>;
  relatives?: Maybe<Array<ItemInfo>>;
  reporting?: Maybe<Scalars['Boolean']>;
  tags?: Maybe<Array<Scalars['String']>>;
  transient: Array<Metric>;
};


export type ItemConfigsArgs = {
  epoch_end?: InputMaybe<Scalars['Int']>;
  epoch_start?: InputMaybe<Scalars['Int']>;
  fields: Array<Scalars['String']>;
  samples?: InputMaybe<Scalars['Int']>;
  summary?: InputMaybe<Scalars['Int']>;
};


export type ItemMetricsArgs = {
  epoch_end?: InputMaybe<Scalars['Int']>;
  epoch_start?: InputMaybe<Scalars['Int']>;
  formulas: Array<Scalars['String']>;
  samples?: InputMaybe<Scalars['Int']>;
  summary?: InputMaybe<Scalars['Int']>;
};


export type ItemRelative_MetricsArgs = {
  aggregate_function?: InputMaybe<Scalars['String']>;
  child_types: Array<Scalars['String']>;
  epoch_end?: InputMaybe<Scalars['Int']>;
  epoch_start?: InputMaybe<Scalars['Int']>;
  formulas: Array<Scalars['String']>;
  samples?: InputMaybe<Scalars['Int']>;
  summary?: InputMaybe<Scalars['Int']>;
};


export type ItemRelativesArgs = {
  custom_tags?: InputMaybe<Array<Scalars['String']>>;
  epoch_end?: InputMaybe<Scalars['Int']>;
  epoch_start?: InputMaybe<Scalars['Int']>;
  item_ids?: InputMaybe<Array<Scalars['ID']>>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  types?: InputMaybe<Array<Scalars['String']>>;
};


export type ItemTransientArgs = {
  child_type: Scalars['String'];
  epoch_end?: InputMaybe<Scalars['Int']>;
  epoch_start?: InputMaybe<Scalars['Int']>;
  fields: Array<Scalars['String']>;
  where?: InputMaybe<Scalars['String']>;
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
  alias?: Maybe<Scalars['String']>;
  data: Array<Maybe<Scalars['Float']>>;
  display_data: Array<Maybe<Scalars['String']>>;
  formula?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  /** item identifiers */
  item_id?: Maybe<Scalars['String']>;
  item_name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  pretty_data: Array<Maybe<Scalars['String']>>;
  samples?: Maybe<Scalars['Int']>;
  /** range stuff */
  start_epoch?: Maybe<Scalars['Int']>;
  summary?: Maybe<Scalars['Int']>;
  /** adding these to support charts */
  unit?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  chart?: Maybe<Chart>;
  items: Array<Item>;
  type_ahead: TypeAhead;
};


export type QueryChartArgs = {
  epoch_end?: InputMaybe<Scalars['Int']>;
  epoch_start?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<VisOptions>;
  selector: Array<Selector>;
  vis_id: Scalars['String'];
};


export type QueryItemsArgs = {
  epoch_end?: InputMaybe<Scalars['Int']>;
  epoch_start?: InputMaybe<Scalars['Int']>;
  selector: Array<Selector>;
};


export type QueryType_AheadArgs = {
  epoch_end?: InputMaybe<Scalars['Int']>;
  epoch_start?: InputMaybe<Scalars['Int']>;
  selector?: InputMaybe<Array<Selector>>;
};

export type Selector = {
  custom_tags?: InputMaybe<Array<Scalars['String']>>;
  item_ids?: InputMaybe<Array<Scalars['ID']>>;
  item_regex?: InputMaybe<Scalars['String']>;
  related_to?: InputMaybe<Array<Selector>>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  types?: InputMaybe<Array<Scalars['String']>>;
};

export type StringTuple = {
  __typename?: 'StringTuple';
  epoch: Scalars['Int'];
  value: Scalars['String'];
};

export type TypeAhead = {
  __typename?: 'TypeAhead';
  /** Configuration fields avilable for current selection, will be blown out and summarized to match formula field */
  config_fields?: Maybe<Array<Scalars['String']>>;
  /** These are Tags created by you in Galileo Tag Manager - https://my.galileosuite.com/atsgroup/tagging */
  custom_tags?: Maybe<Array<Scalars['String']>>;
  /**
   * Formulas, tell the data base what to query, this will fill with a list of avilable column names.
   * common sql syntax is supported. Example: Max(CpuBusyAll)
   */
  formulas?: Maybe<Array<Scalars['String']>>;
  /**
   * Final level of selection, filtered by the fields selected above, specifiy what items to request here.
   * Make sure selections are valid above or no items will be returned
   */
  item_ids?: Maybe<Array<Scalars['ID']>>;
  /**
   * Internal Tags of galileo, filtered by the fields selected above. Used primally to distiguesed between
   * items with the same type, for example AIX and WINDOWS are of type host,
   * but they have different configs, if you want to request on only windows hosts this selector is useful
   */
  tags?: Maybe<Array<Scalars['String']>>;
  /** Configuration fields avilable for currently selected transient type */
  transient_fields?: Maybe<Array<Scalars['String']>>;
  /** Similar to types as before but only for transients, which is essentally ephemeral data, generally used for proccesses */
  transient_types?: Maybe<Array<Scalars['String']>>;
  /**
   * Internal Types for Galileo, Generaly what should be selected
   * first. Types control what configs and formulas are avilaible,
   * Note: selecting more than one type is possible but can result in a strange return,
   * Some fields return for several items but are nulled for others
   */
  types?: Maybe<Array<Scalars['String']>>;
  /** Availible vid_ids for the given item selection */
  vis_ids: Array<Scalars['String']>;
};

export type VisOptions = {
  filters?: InputMaybe<Scalars['String']>;
  function?: InputMaybe<Scalars['String']>;
  samples?: InputMaybe<Scalars['Int']>;
  summary?: InputMaybe<Scalars['Int']>;
};
