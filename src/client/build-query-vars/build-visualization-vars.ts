import { GpeQuery } from '../../types/query';
import { VisualizationQueryVariables } from '../queries/queries';
import { buildSelectorVars } from './build-selector-vars'

export const buildVisualizationVars = (
  target: Partial<GpeQuery>,
  { epoch_start, epoch_end }: { epoch_start: number, epoch_end:number }
): VisualizationQueryVariables => {
  const {
    summary,
    samples,

    vis_id,
    filters,
  } = target;

  let vars: VisualizationQueryVariables = {
    ...buildSelectorVars(target),

    summary,
    samples,
    vis_id: (vis_id ?? [""])[0],
    filters,
    function: target.function, // doing this cuz function is reserved

    epoch_start,
    epoch_end,
  };

  if (vars.samples) {
    vars.summary = null;
  }

  return vars;
};