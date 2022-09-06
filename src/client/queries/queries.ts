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
  transient_type: Scalars['String'];
  transient_fields: Array<Scalars['String']> | Scalars['String'];
}>;


export type ItemsWithMetricsQuery = { __typename?: 'Query', items: Array<{ __typename: 'Item', id: string, item_type: string, tags?: Array<string> | null, label: string, configs: Array<{ __typename?: 'Config', start_epoch: number, summary: number, field: string, data: Array<string | null>, tuple?: Array<{ __typename?: 'StringTuple', value: string, epoch: number }> | null }>, metrics: Array<{ __typename: 'Metric', start_epoch: number, summary: number, formula: string, data: Array<number | null> }>, transient?: Array<{ __typename: 'TransientRow', values: Array<string | null>, fields: Array<string | null> }> | null }> };

export type ConfigsFragment = { __typename?: 'Item', configs: Array<{ __typename?: 'Config', start_epoch: number, summary: number, field: string, data: Array<string | null>, tuple?: Array<{ __typename?: 'StringTuple', value: string, epoch: number }> | null }> };

export type MetricsFragment = { __typename: 'Item', metrics: Array<{ __typename: 'Metric', start_epoch: number, summary: number, formula: string, data: Array<number | null> }> };

export type TransientFragment = { __typename: 'Item', transient?: Array<{ __typename: 'TransientRow', values: Array<string | null>, fields: Array<string | null> }> | null };

export type GetCustomTagsQueryVariables = Exact<{
  epoch_start: Scalars['Int'];
  epoch_end: Scalars['Int'];
}>;


export type GetCustomTagsQuery = { __typename?: 'Query', type_ahead: { __typename?: 'TypeAhead', custom_tags?: Array<string> | null } };

export type GetTypesQueryVariables = Exact<{
  custom_tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  epoch_start: Scalars['Int'];
  epoch_end: Scalars['Int'];
}>;


export type GetTypesQuery = { __typename?: 'Query', type_ahead: { __typename?: 'TypeAhead', types?: Array<string> | null, transient_types?: Array<string> | null } };

export type GetTransientTypesQueryVariables = Exact<{
  custom_tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  types?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  item_ids?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
  epoch_start: Scalars['Int'];
  epoch_end: Scalars['Int'];
}>;


export type GetTransientTypesQuery = { __typename?: 'Query', type_ahead: { __typename?: 'TypeAhead', types?: Array<string> | null, transient_types?: Array<string> | null } };

export type GetTagsQueryVariables = Exact<{
  custom_tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  types?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  epoch_start: Scalars['Int'];
  epoch_end: Scalars['Int'];
}>;


export type GetTagsQuery = { __typename?: 'Query', type_ahead: { __typename?: 'TypeAhead', tags?: Array<string> | null } };

export type GetItemsQueryVariables = Exact<{
  custom_tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  types?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  item_ids?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
  epoch_start: Scalars['Int'];
  epoch_end: Scalars['Int'];
}>;


export type GetItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: string, label: string }> };

export type GetConfigsQueryVariables = Exact<{
  custom_tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  types?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  item_ids?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
  epoch_start: Scalars['Int'];
  epoch_end: Scalars['Int'];
}>;


export type GetConfigsQuery = { __typename?: 'Query', type_ahead: { __typename?: 'TypeAhead', config_fields?: Array<string> | null } };

export type GetFormulasQueryVariables = Exact<{
  custom_tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  types?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  item_ids?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
  epoch_start: Scalars['Int'];
  epoch_end: Scalars['Int'];
}>;


export type GetFormulasQuery = { __typename?: 'Query', type_ahead: { __typename?: 'TypeAhead', types?: Array<string> | null, formulas?: Array<string> | null } };

export const ConfigsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Configs"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"configs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"fields"},"value":{"kind":"Variable","name":{"kind":"Name","value":"configs"}}},{"kind":"Argument","name":{"kind":"Name","value":"summary"},"value":{"kind":"Variable","name":{"kind":"Name","value":"summary"}}},{"kind":"Argument","name":{"kind":"Name","value":"samples"},"value":{"kind":"Variable","name":{"kind":"Name","value":"samples"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tuple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"epoch"}}]}},{"kind":"Field","name":{"kind":"Name","value":"start_epoch"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]} as unknown as DocumentNode<ConfigsFragment, unknown>;
export const MetricsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Metrics"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"metrics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"formulas"},"value":{"kind":"Variable","name":{"kind":"Name","value":"formulas"}}},{"kind":"Argument","name":{"kind":"Name","value":"summary"},"value":{"kind":"Variable","name":{"kind":"Name","value":"summary"}}},{"kind":"Argument","name":{"kind":"Name","value":"samples"},"value":{"kind":"Variable","name":{"kind":"Name","value":"samples"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"start_epoch"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"formula"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]} as unknown as DocumentNode<MetricsFragment, unknown>;
export const TransientFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Transient"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"child_type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"transient_type"}}},{"kind":"Argument","name":{"kind":"Name","value":"fields"},"value":{"kind":"Variable","name":{"kind":"Name","value":"transient_fields"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"values"}},{"kind":"Field","name":{"kind":"Name","value":"fields"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]} as unknown as DocumentNode<TransientFragment, unknown>;
export const ItemsWithMetricsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ItemsWithMetrics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"types"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"item_ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"related_to_types"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"related_to_tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"related_to_custom_tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"related_to_item_ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"configs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"formulas"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"summary"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"samples"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"transient_type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"transient_fields"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"types"},"value":{"kind":"Variable","name":{"kind":"Name","value":"types"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"custom_tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"item_ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"item_ids"}}},{"kind":"Argument","name":{"kind":"Name","value":"related_to"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"types"},"value":{"kind":"Variable","name":{"kind":"Name","value":"related_to_types"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"related_to_tags"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"item_ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"related_to_item_ids"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"custom_tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"related_to_custom_tags"}}}]}]}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"item_type"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Configs"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Metrics"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Transient"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}},...ConfigsFragmentDoc.definitions,...MetricsFragmentDoc.definitions,...TransientFragmentDoc.definitions]} as unknown as DocumentNode<ItemsWithMetricsQuery, ItemsWithMetricsQueryVariables>;
export const GetCustomTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCustomTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type_ahead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"custom_tags"}}]}}]}}]} as unknown as DocumentNode<GetCustomTagsQuery, GetCustomTagsQueryVariables>;
export const GetTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTypes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type_ahead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"custom_tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"types"}},{"kind":"Field","name":{"kind":"Name","value":"transient_types"}}]}}]}}]} as unknown as DocumentNode<GetTypesQuery, GetTypesQueryVariables>;
export const GetTransientTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTransientTypes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"types"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"item_ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type_ahead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"custom_tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"types"}},{"kind":"Field","name":{"kind":"Name","value":"transient_types"}}]}}]}}]} as unknown as DocumentNode<GetTransientTypesQuery, GetTransientTypesQueryVariables>;
export const GetTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"types"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type_ahead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"custom_tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"types"},"value":{"kind":"Variable","name":{"kind":"Name","value":"types"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]} as unknown as DocumentNode<GetTagsQuery, GetTagsQueryVariables>;
export const GetItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"types"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"item_ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"custom_tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"types"},"value":{"kind":"Variable","name":{"kind":"Name","value":"types"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"item_ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"item_ids"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<GetItemsQuery, GetItemsQueryVariables>;
export const GetConfigsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetConfigs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"types"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"item_ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type_ahead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"custom_tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"types"},"value":{"kind":"Variable","name":{"kind":"Name","value":"types"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"item_ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"item_ids"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"config_fields"}}]}}]}}]} as unknown as DocumentNode<GetConfigsQuery, GetConfigsQueryVariables>;
export const GetFormulasDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFormulas"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"types"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"item_ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type_ahead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"types"},"value":{"kind":"Variable","name":{"kind":"Name","value":"types"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"custom_tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"custom_tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"item_ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"item_ids"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_start"}}},{"kind":"Argument","name":{"kind":"Name","value":"epoch_end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"epoch_end"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"types"}},{"kind":"Field","name":{"kind":"Name","value":"formulas"}}]}}]}}]} as unknown as DocumentNode<GetFormulasQuery, GetFormulasQueryVariables>;