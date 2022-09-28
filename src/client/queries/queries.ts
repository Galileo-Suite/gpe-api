import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  start_epoch?: Maybe<Scalars['Float']>;
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
  samples?: InputMaybe<Scalars['Int']>;
  selector: Array<Selector>;
  summary?: InputMaybe<Scalars['Int']>;
  vis_id: Scalars['String'];
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
  filter?: InputMaybe<Scalars['String']>;
  samples?: InputMaybe<Scalars['Int']>;
  summary?: InputMaybe<Scalars['Int']>;
};

/** One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string. */
export type __EnumValue = {
  __typename?: '__EnumValue';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  isDeprecated: Scalars['Boolean'];
  deprecationReason?: Maybe<Scalars['String']>;
};

/** Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type. */
export type __Field = {
  __typename?: '__Field';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  args: Array<__InputValue>;
  type: __Type;
  isDeprecated: Scalars['Boolean'];
  deprecationReason?: Maybe<Scalars['String']>;
};


/** Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type. */
export type __FieldArgsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
};

/** Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value. */
export type __InputValue = {
  __typename?: '__InputValue';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type: __Type;
  /** A GraphQL-formatted string representing the default value for this input value. */
  defaultValue?: Maybe<Scalars['String']>;
  isDeprecated: Scalars['Boolean'];
  deprecationReason?: Maybe<Scalars['String']>;
};

/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __Type = {
  __typename?: '__Type';
  kind: __TypeKind;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  specifiedByURL?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<__Field>>;
  interfaces?: Maybe<Array<__Type>>;
  possibleTypes?: Maybe<Array<__Type>>;
  enumValues?: Maybe<Array<__EnumValue>>;
  inputFields?: Maybe<Array<__InputValue>>;
  ofType?: Maybe<__Type>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeFieldsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeEnumValuesArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeInputFieldsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
};

/** An enum describing what kind of type a given `__Type` is. */
export enum __TypeKind {
  /** Indicates this type is a scalar. */
  Scalar = 'SCALAR',
  /** Indicates this type is an object. `fields` and `interfaces` are valid fields. */
  Object = 'OBJECT',
  /** Indicates this type is an interface. `fields`, `interfaces`, and `possibleTypes` are valid fields. */
  Interface = 'INTERFACE',
  /** Indicates this type is a union. `possibleTypes` is a valid field. */
  Union = 'UNION',
  /** Indicates this type is an enum. `enumValues` is a valid field. */
  Enum = 'ENUM',
  /** Indicates this type is an input object. `inputFields` is a valid field. */
  InputObject = 'INPUT_OBJECT',
  /** Indicates this type is a list. `ofType` is a valid field. */
  List = 'LIST',
  /** Indicates this type is a non-null. `ofType` is a valid field. */
  NonNull = 'NON_NULL'
}

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


export type ItemsWithMetricsQuery = { __typename?: 'Query', items: Array<{ __typename: 'Item', id: string, item_type: string, tags?: Array<string> | null, label: string, configs: Array<{ __typename?: 'Config', start_epoch: number, summary: number, field: string, data: Array<string | null>, tuple?: Array<{ __typename?: 'StringTuple', value: string, epoch: number }> | null }>, metrics: Array<{ __typename: 'Metric', start_epoch?: number | null, summary?: number | null, formula?: string | null, data: Array<number | null> }> }> };

export type ConfigsFragment = { __typename?: 'Item', configs: Array<{ __typename?: 'Config', start_epoch: number, summary: number, field: string, data: Array<string | null>, tuple?: Array<{ __typename?: 'StringTuple', value: string, epoch: number }> | null }> };

export type MetricsFragment = { __typename: 'Item', metrics: Array<{ __typename: 'Metric', start_epoch?: number | null, summary?: number | null, formula?: string | null, data: Array<number | null> }> };

export type TransientsQueryVariables = Exact<{
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
  summary?: InputMaybe<Scalars['Int']>;
  samples?: InputMaybe<Scalars['Int']>;
  configs: Array<Scalars['String']> | Scalars['String'];
  transient_type: Scalars['String'];
  transient_fields: Array<Scalars['String']> | Scalars['String'];
  transient_where?: InputMaybe<Scalars['String']>;
}>;


export type TransientsQuery = { __typename?: 'Query', items: Array<{ __typename: 'Item', id: string, item_type: string, tags?: Array<string> | null, label: string, configs: Array<{ __typename?: 'Config', field: string, tuple?: Array<{ __typename?: 'StringTuple', value: string, epoch: number }> | null }>, transient: Array<{ __typename: 'Metric', id?: string | null, start_epoch?: number | null, label?: string | null, data: Array<number | null>, pretty_data: Array<string | null> }> }> };

export type TransientConfigsFragment = { __typename?: 'Item', configs: Array<{ __typename?: 'Config', field: string, tuple?: Array<{ __typename?: 'StringTuple', value: string, epoch: number }> | null }> };

export type TransientFragment = { __typename: 'Item', transient: Array<{ __typename: 'Metric', id?: string | null, start_epoch?: number | null, label?: string | null, data: Array<number | null>, pretty_data: Array<string | null> }> };

export type GetCustomTagsQueryVariables = Exact<{
  epoch_start?: InputMaybe<Scalars['Int']>;
  epoch_end?: InputMaybe<Scalars['Int']>;
}>;


export type GetCustomTagsQuery = { __typename?: 'Query', type_ahead: { __typename?: 'TypeAhead', custom_tags?: Array<string> | null } };

export type GetTypesQueryVariables = Exact<{
  custom_tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  epoch_start?: InputMaybe<Scalars['Int']>;
  epoch_end?: InputMaybe<Scalars['Int']>;
}>;


export type GetTypesQuery = { __typename?: 'Query', type_ahead: { __typename?: 'TypeAhead', types?: Array<string> | null, transient_types?: Array<string> | null } };

export type GetTransientTypesQueryVariables = Exact<{
  custom_tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  types?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  item_ids?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
  epoch_start?: InputMaybe<Scalars['Int']>;
  epoch_end?: InputMaybe<Scalars['Int']>;
}>;


export type GetTransientTypesQuery = { __typename?: 'Query', type_ahead: { __typename?: 'TypeAhead', types?: Array<string> | null, transient_types?: Array<string> | null } };

export type GetTagsQueryVariables = Exact<{
  custom_tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  types?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  epoch_start?: InputMaybe<Scalars['Int']>;
  epoch_end?: InputMaybe<Scalars['Int']>;
}>;


export type GetTagsQuery = { __typename?: 'Query', type_ahead: { __typename?: 'TypeAhead', tags?: Array<string> | null } };

export type GetItemsQueryVariables = Exact<{
  custom_tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  types?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  item_ids?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
  epoch_start?: InputMaybe<Scalars['Int']>;
  epoch_end?: InputMaybe<Scalars['Int']>;
}>;


export type GetItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: string, label: string }> };

export type GetConfigsQueryVariables = Exact<{
  custom_tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  types?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  item_ids?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
  epoch_start?: InputMaybe<Scalars['Int']>;
  epoch_end?: InputMaybe<Scalars['Int']>;
}>;


export type GetConfigsQuery = { __typename?: 'Query', type_ahead: { __typename?: 'TypeAhead', config_fields?: Array<string> | null } };

export type GetFormulasQueryVariables = Exact<{
  custom_tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  types?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  item_ids?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
  epoch_start?: InputMaybe<Scalars['Int']>;
  epoch_end?: InputMaybe<Scalars['Int']>;
}>;


export type GetFormulasQuery = { __typename?: 'Query', type_ahead: { __typename?: 'TypeAhead', types?: Array<string> | null, formulas?: Array<string> | null } };

export type TypeAheadDescriptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type TypeAheadDescriptionsQuery = { __typename?: 'Query', __type?: { __typename?: '__Type', name?: string | null, fields?: Array<{ __typename?: '__Field', name: string, description?: string | null }> | null } | null };

export type GetVisIdsQueryVariables = Exact<{
  custom_tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  types?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  item_ids?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
  epoch_start?: InputMaybe<Scalars['Int']>;
  epoch_end?: InputMaybe<Scalars['Int']>;
}>;


export type GetVisIdsQuery = { __typename?: 'Query', type_ahead: { __typename?: 'TypeAhead', vis_ids: Array<string> } };

export type VisualizationQueryVariables = Exact<{
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
  summary?: InputMaybe<Scalars['Int']>;
  samples?: InputMaybe<Scalars['Int']>;
  vis_id: Scalars['String'];
}>;


export type VisualizationQuery = { __typename?: 'Query', chart?: { __typename?: 'Chart', title?: string | null, columns: Array<{ __typename?: 'Metric', label?: string | null, unit?: string | null, data: Array<number | null>, pretty_data: Array<string | null> } | null> } | null };

export const ConfigsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Configs"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"configs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"fields"},"value":{"kind":"Variable","name":{"kind":"Name","value":"configs"}}},{"kind":"Argument","name":{"kind":"Name","value":"summary"},"value":{"kind":"Variable","name":{"kind":"Name","value":"summary"}}},{"kind":"Argument","name":{"kind":"Name","value":"samples"},"value":{"kind":"Variable","name":{"kind":"Name","value":"samples"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tuple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"epoch"}}]}},{"kind":"Field","name":{"kind":"Name","value":"start_epoch"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]} as unknown as DocumentNode<ConfigsFragment, unknown>;
export const MetricsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Metrics"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"metrics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"formulas"},"value":{"kind":"Variable","name":{"kind":"Name","value":"formulas"}}},{"kind":"Argument","name":{"kind":"Name","value":"summary"},"value":{"kind":"Variable","name":{"kind":"Name","value":"summary"}}},{"kind":"Argument","name":{"kind":"Name","value":"samples"},"value":{"kind":"Variable","name":{"kind":"Name","value":"samples"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"start_epoch"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"formula"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]} as unknown as DocumentNode<MetricsFragment, unknown>;
export const TransientConfigsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransientConfigs"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"configs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"fields"},"value":{"kind":"Variable","name":{"kind":"Name","value":"configs"}}},{"kind":"Argument","name":{"kind":"Name","value":"summary"},"value":{"kind":"Variable","name":{"kind":"Name","value":"summary"}}},{"kind":"Argument","name":{"kind":"Name","value":"samples"},"value":{"kind":"Variable","name":{"kind":"Name","value":"samples"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"tuple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"epoch"}}]}}]}}]}}]} as unknown as DocumentNode<TransientConfigsFragment, unknown>;
export const TransientFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Transient"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"child_type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"transient_type"}}},{"kind":"Argument","name":{"kind":"Name","value":"fields"},"value":{"kind":"Variable","name":{"kind":"Name","value":"transient_fields"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"transient_where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start_epoch"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"pretty_data"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]} as unknown as DocumentNode<TransientFragment, unknown>;
export const ItemsWithMetricsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ItemsWithMetrics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"types"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"item_ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"related_to_types"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"related_to_tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"related_to_custom_tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"related_to_item_ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"configs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"formulas"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"summary"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"samples"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"types"},"value":{"kind":"Variable","name":{"kind":"Name","value":"types"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"custom_tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"item_ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"item_ids"}}},{"kind":"Argument","name":{"kind":"Name","value":"related_to"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"types"},"value":{"kind":"Variable","name":{"kind":"Name","value":"related_to_types"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"related_to_tags"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"item_ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"related_to_item_ids"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"custom_tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"related_to_custom_tags"}}}]}]}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"item_type"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Configs"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Metrics"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}},...ConfigsFragmentDoc.definitions,...MetricsFragmentDoc.definitions]} as unknown as DocumentNode<ItemsWithMetricsQuery, ItemsWithMetricsQueryVariables>;
export const TransientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Transients"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"types"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"item_ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"related_to_types"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"related_to_tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"related_to_custom_tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"related_to_item_ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"summary"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"samples"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"configs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"transient_type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"transient_fields"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"transient_where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"types"},"value":{"kind":"Variable","name":{"kind":"Name","value":"types"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"custom_tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"item_ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"item_ids"}}},{"kind":"Argument","name":{"kind":"Name","value":"related_to"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"types"},"value":{"kind":"Variable","name":{"kind":"Name","value":"related_to_types"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"related_to_tags"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"item_ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"related_to_item_ids"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"custom_tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"related_to_custom_tags"}}}]}]}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"item_type"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransientConfigs"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Transient"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}},...TransientConfigsFragmentDoc.definitions,...TransientFragmentDoc.definitions]} as unknown as DocumentNode<TransientsQuery, TransientsQueryVariables>;
export const GetCustomTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCustomTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type_ahead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"custom_tags"}}]}}]}}]} as unknown as DocumentNode<GetCustomTagsQuery, GetCustomTagsQueryVariables>;
export const GetTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTypes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type_ahead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"custom_tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"types"}},{"kind":"Field","name":{"kind":"Name","value":"transient_types"}}]}}]}}]} as unknown as DocumentNode<GetTypesQuery, GetTypesQueryVariables>;
export const GetTransientTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTransientTypes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"types"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"item_ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type_ahead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"custom_tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"types"}},{"kind":"Field","name":{"kind":"Name","value":"transient_types"}}]}}]}}]} as unknown as DocumentNode<GetTransientTypesQuery, GetTransientTypesQueryVariables>;
export const GetTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"types"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type_ahead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"custom_tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"types"},"value":{"kind":"Variable","name":{"kind":"Name","value":"types"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]} as unknown as DocumentNode<GetTagsQuery, GetTagsQueryVariables>;
export const GetItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"types"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"item_ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"custom_tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"types"},"value":{"kind":"Variable","name":{"kind":"Name","value":"types"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"item_ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"item_ids"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<GetItemsQuery, GetItemsQueryVariables>;
export const GetConfigsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetConfigs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"types"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"item_ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type_ahead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"custom_tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"types"},"value":{"kind":"Variable","name":{"kind":"Name","value":"types"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"item_ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"item_ids"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"config_fields"}}]}}]}}]} as unknown as DocumentNode<GetConfigsQuery, GetConfigsQueryVariables>;
export const GetFormulasDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFormulas"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"types"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"item_ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type_ahead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"types"},"value":{"kind":"Variable","name":{"kind":"Name","value":"types"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"custom_tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"item_ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"item_ids"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"types"}},{"kind":"Field","name":{"kind":"Name","value":"formulas"}}]}}]}}]} as unknown as DocumentNode<GetFormulasQuery, GetFormulasQueryVariables>;
export const TypeAheadDescriptionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TypeAheadDescriptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__type"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"TypeAhead","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<TypeAheadDescriptionsQuery, TypeAheadDescriptionsQueryVariables>;
export const GetVisIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVisIds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"types"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"item_ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type_ahead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"types"},"value":{"kind":"Variable","name":{"kind":"Name","value":"types"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"custom_tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"item_ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"item_ids"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vis_ids"}}]}}]}}]} as unknown as DocumentNode<GetVisIdsQuery, GetVisIdsQueryVariables>;
export const VisualizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Visualization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"types"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"item_ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"related_to_types"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"related_to_tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"related_to_custom_tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"related_to_item_ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"summary"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"samples"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vis_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}},{"kind":"Argument","name":{"kind":"Name","value":"vis_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vis_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"summary"},"value":{"kind":"Variable","name":{"kind":"Name","value":"summary"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"samples"},"value":{"kind":"Variable","name":{"kind":"Name","value":"samples"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"selector"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"types"},"value":{"kind":"Variable","name":{"kind":"Name","value":"types"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"custom_tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"item_ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"item_ids"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"related_to"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"types"},"value":{"kind":"Variable","name":{"kind":"Name","value":"related_to_types"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"related_to_tags"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"item_ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"related_to_item_ids"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"custom_tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"related_to_custom_tags"}}}]}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"pretty_data"}}]}}]}}]}}]} as unknown as DocumentNode<VisualizationQuery, VisualizationQueryVariables>;