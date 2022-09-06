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
  transient?: Maybe<Array<TransientRow>>;
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
  epoch_end: Scalars['Int'];
  epoch_start: Scalars['Int'];
  item_ids?: InputMaybe<Array<Scalars['ID']>>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  types?: InputMaybe<Array<Scalars['String']>>;
};


export type ItemTransientArgs = {
  child_type: Scalars['String'];
  epoch_end?: InputMaybe<Scalars['Int']>;
  epoch_start?: InputMaybe<Scalars['Int']>;
  fields: Array<Scalars['String']>;
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
  id?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  samples?: Maybe<Scalars['Int']>;
  start_epoch: Scalars['Int'];
  summary: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  /**
   * this is code
   * ```sdfsdf```
   * sdf
   * sdf
   * sdfsd
   */
  items: Array<Item>;
  type_ahead: TypeAhead;
};


export type QueryItemsArgs = {
  custom_tags?: InputMaybe<Array<Scalars['String']>>;
  epoch_end?: InputMaybe<Scalars['Int']>;
  epoch_start?: InputMaybe<Scalars['Int']>;
  item_ids?: InputMaybe<Array<Scalars['ID']>>;
  related_to?: InputMaybe<Array<Selector>>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  types?: InputMaybe<Array<Scalars['String']>>;
};


export type QueryType_AheadArgs = {
  custom_tags?: InputMaybe<Array<Scalars['String']>>;
  epoch_end?: InputMaybe<Scalars['Int']>;
  epoch_start?: InputMaybe<Scalars['Int']>;
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

export type StringTuple = {
  __typename?: 'StringTuple';
  epoch: Scalars['Int'];
  value: Scalars['String'];
};

export type TransientRow = {
  __typename?: 'TransientRow';
  fields: Array<Maybe<Scalars['String']>>;
  values: Array<Maybe<Scalars['String']>>;
};

export type TypeAhead = {
  __typename?: 'TypeAhead';
  config_fields?: Maybe<Array<Scalars['String']>>;
  custom_tags?: Maybe<Array<Scalars['String']>>;
  formulas?: Maybe<Array<Scalars['String']>>;
  item_ids?: Maybe<Array<Scalars['ID']>>;
  tags?: Maybe<Array<Scalars['String']>>;
  transient_fields?: Maybe<Array<Scalars['String']>>;
  transient_types?: Maybe<Array<Scalars['String']>>;
  types?: Maybe<Array<Scalars['String']>>;
};
