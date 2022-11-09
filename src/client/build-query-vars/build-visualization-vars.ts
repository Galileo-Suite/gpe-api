import { GpeQuery } from '../../types/query';
import { VisualizationQueryVariables } from '../queries/queries';
import { buildForecastOpts } from './build-forecast-vars';
import { buildSelectorVars } from './build-selector-vars'
import { buildSummaryVars } from './build-summary-vars'

export const buildVisualizationVars = (
  target: Partial<GpeQuery>,
  { epoch_start, epoch_end }: { epoch_start: number, epoch_end:number }
): VisualizationQueryVariables => {
  const {
    vis_id,
    filters,
  } = target;

  let vars: VisualizationQueryVariables = {
    ...buildSelectorVars({...target}),
    ...buildSummaryVars({...target}),
    ...buildForecastOpts({...target}),

    vis_id: (vis_id ?? [""])[0],
    filters,
    function: target.function, // doing this cuz function is reserved

    epoch_start,
    epoch_end,
  };

  return vars;
};
