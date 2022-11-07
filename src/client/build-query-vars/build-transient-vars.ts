import { GpeQuery } from '../../types/query';
import { TransientsQueryVariables } from '../queries/queries';
import {buildSelectorVars} from './build-selector-vars'

export const buildTransientVars = (
  target: Partial<GpeQuery>,
  { epoch_start, epoch_end }: { epoch_start: number, epoch_end:number }
): TransientsQueryVariables => {
  let {
    configs,

    transient_type,
    transient_fields,
    transient_where
  } = target;

  let vars: TransientsQueryVariables = {
    ...buildSelectorVars(target),

    // emptys
    configs: configs ?? [],
    transient_fields: transient_fields ?? [],
    transient_type: transient_type ?? '',
    transient_where,
    //
    epoch_start,
    epoch_end,
  };

  if (vars.samples) {
    vars.summary = null;
  }

  if (vars.transient_type !== '' && transient_fields?.length === 0) {
    throw new Error('must select values for transient if selecting transient type')
  }

  return vars;
};
