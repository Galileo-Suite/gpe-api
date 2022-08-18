import defaults from 'lodash/defaults';

import { ScopedVars, TimeRange } from '@grafana/data';

import { GpeQuery, defaultGpeQuery } from '../types/query';
import { unwrapOptionalTimeRange } from './unwrap-optional-time-range';
import { ItemsWithMetricsQueryVariables } from '../client/queries/queries';

const dup = <T>(p: T): T => JSON.parse(JSON.stringify(p));

export const applyGrafanaVars = <T>(object: T, scopedVars:ScopedVars ): T => {
  let str = JSON.stringify(object)
  const replacefunc = (v:string | string[]): string => {
    if (typeof v === 'string') {
      return v;
    }
    return v.join('","');
  }
  Object.values(scopedVars).forEach(v => {
    const value = replacefunc(v.value)
    str = str.replace('$'+v.text, value)
  });
  
  return JSON.parse(str) as T;
};

export const buildItemWithMetricsVars = (
  target: Partial<GpeQuery>,
  { epoch_start, epoch_end }: { epoch_start: number, epoch_end:number },
  scopedVars: ScopedVars = {},
): ItemsWithMetricsQueryVariables => {
  let query = defaults(dup(target), defaultGpeQuery);
  query = applyGrafanaVars(query, scopedVars);

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
  } = query;

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
    
    // emptys
    transient_fields: [],
    transient_type: ''
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
  
  if (request_type === 'metrics') {
    vars = {
      ...vars,
      configs: configs ?? [],
      formulas: formulas ?? [],
      summary,
      samples,
    }
  }
  
  if (request_type==='transient') {
    vars = {
      ...vars,
      configs: configs ?? [],
      transient_fields: transient_fields ?? [],
      transient_type: transient_type ?? ''
    }
  }
  
  if (vars.samples) {
    vars.summary = null;
  }
  
  return vars;
};
