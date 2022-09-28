import defaults from 'lodash/defaults';

import { ScopedVars, TimeRange } from '@grafana/data';

import { GpeQuery, defaultGpeQuery } from '../types/query';
import { ItemsWithMetricsQueryVariables } from '../client/queries/queries';

const dup = <T>(p: T): T => JSON.parse(JSON.stringify(p));

export const applyGrafanaVars = <T>(object: T, scopedVars: ScopedVars ): T => {
  let str = JSON.stringify(object)
  const replacefunc = (v: string | string[]): string => {
    if (typeof v === 'string') {
      return v;
    }
    return v.join('","');
  }
  Object.values(scopedVars).forEach(v => {
    if (v.value) {
      const value = replacefunc(v.value)
      str = str.replace('$'+v.text, value)
    }
  });

  return JSON.parse(str) as T;
};

export const templateTarget = ( target: Partial<GpeQuery>, scopedVars: ScopedVars = {} )=>{
  let query = defaults(dup(target), defaultGpeQuery);
  query = applyGrafanaVars(query, scopedVars);
  return query
}

export const buildItemWithMetricsVars = (
  target: Partial<GpeQuery>,
  { epoch_start, epoch_end }: { epoch_start: number, epoch_end:number }
): ItemsWithMetricsQueryVariables => {
  let {
    use_related_to,
    request_type,

    types,
    tags,
    custom_tags,
    item_ids,
    configs,
    formulas,
    summary,
    samples,

    related_to_types,
    related_to_tags,
    related_to_custom_tags,
    related_to_item_ids,

    transient_type,
    transient_fields,
    transient_where
  } = target;

  let vars: ItemsWithMetricsQueryVariables = {
    epoch_start,
    epoch_end,
    types: types ?? '',
    tags,
    custom_tags: custom_tags ?? '',
    item_ids,

    // empty
    configs: [],
    formulas: [],
    summary: null,
    samples: null,

    // empty
    related_to_types: [],
    related_to_tags: [],
    related_to_custom_tags: [],
    related_to_item_ids: [],

  };

  if (use_related_to === true) {
    vars = {
      ...vars,
      related_to_types: related_to_types ?? '',
      related_to_tags,
      related_to_custom_tags: related_to_custom_tags ?? '',
      related_to_item_ids,
    };
  }

  vars = {
    ...vars,
    configs: configs ?? [],
    formulas: formulas?.filter(f=>f !== "") ?? [], // incase user inputs empty string, purely for working case where user has empty formula we don't want to send it
    summary,
    samples,
  }


  if (vars.samples) {
    vars.summary = null;
  }

  return vars;
};
