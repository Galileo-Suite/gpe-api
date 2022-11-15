import { GpeQuery, defaultGpeQuery } from '../types';
import { ScopedVars } from '@grafana/data';
import defaults from 'lodash.defaults';
import { sr } from 'date-fns/locale';

const dup = <T>(p: T): T => JSON.parse(JSON.stringify(p));
const defaultTemplate = {
  start:'$',
  end: ''
}
export const applyGrafanaVars = <T extends object>(object: T, scopedVars: ScopedVars, template = defaultTemplate): T => {
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
      str = str.replaceAll(template.start+v.text+template.end, value)
    }
  });

  return JSON.parse(str) as T;
};

export const templateTarget = ( target: Partial<GpeQuery>, scopedVars: ScopedVars = {} )=>{
  let query = defaults(dup(target), defaultGpeQuery);
  query = applyGrafanaVars(query, scopedVars);
  return query
}
