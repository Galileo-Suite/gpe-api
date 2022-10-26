import { GpeQuery, defaultGpeQuery } from '../types';
import { ScopedVars } from '@grafana/data';
import defaults from 'lodash.defaults';
import { sr } from 'date-fns/locale';

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
      str = str.replaceAll('$'+v.text, value)
    }
  });

  return JSON.parse(str) as T;
};

export const templateTarget = ( target: Partial<GpeQuery>, scopedVars: ScopedVars = {} )=>{
  let query = defaults(dup(target), defaultGpeQuery);
  query = applyGrafanaVars(query, scopedVars);
  return query
}
