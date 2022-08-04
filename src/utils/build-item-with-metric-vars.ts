import defaults from 'lodash/defaults';

import { ScopedVars, TimeRange } from '@grafana/data';

import { getTemplateSrv, TemplateSrv } from '@grafana/runtime';

import { GpeQuery, defaultGpeQuery } from '../types/query';
import { unwrapOptionalTimeRange } from './unwrap-optional-time-range';
import { ItemsWithMetricsQueryVariables } from 'src/client/queries/queries';

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

export const getScopedVars = ():ScopedVars => {
  const scopedVars: ScopedVars = {};
  getTemplateSrv().getVariables()
    .forEach((v) => {
      scopedVars[v.name] = {
        //@ts-ignore
        value: v.current.value,
        text: v.name,
      };
    });
    
  return scopedVars
}

export const buildItemWithMetricsVars = (
  target: Partial<GpeQuery>,
  range?: TimeRange,
  scopedVars: ScopedVars = {},
): ItemsWithMetricsQueryVariables => {
  let query = defaults(dup(target), defaultGpeQuery);
  query = applyGrafanaVars(query, scopedVars);
  const { epoch_start, epoch_end } = unwrapOptionalTimeRange(range);

  let {
    use_related_to,
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
  } = query;

  let vars: ItemsWithMetricsQueryVariables = {
    epoch_start,
    epoch_end,
    types: types ?? '',
    tags,
    custom_tags: custom_tags ?? '',
    item_ids,
    configs: configs ?? '',
    formulas: formulas ?? '',
    summary,
    samples,

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

  if (vars.samples) {
    vars.summary = null;
  }
  return vars;
};
