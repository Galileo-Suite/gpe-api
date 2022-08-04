import { ScopedVars } from '@grafana/data';

import { getTemplateSrv } from '@grafana/runtime';


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