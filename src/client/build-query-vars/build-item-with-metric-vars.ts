import { GpeQuery } from '../../types/query';
import { ItemsWithMetricsQueryVariables } from '../queries/queries';
import { buildSelectorVars } from './build-selector-vars'
import { buildSummaryVars } from './build-summary-vars'
import { buildForecastOpts } from './build-forecast-vars'


export const buildItemWithMetricsVars = (
  target: Partial<GpeQuery>,
  { epoch_start, epoch_end }: { epoch_start: number, epoch_end: number }
): ItemsWithMetricsQueryVariables => {
  let {
    configs,
    formulas,

  } = target;

  let vars: ItemsWithMetricsQueryVariables = {
    ...buildSelectorVars(target),
    ...buildSummaryVars(target),
    ...buildForecastOpts(target),

    configs: configs ?? [],
    formulas: formulas?.map(f=>typeof f === 'string'? f : f.formula).filter(f=>f !== "" ) ?? [], // incase user inputs empty string, if user add a formula but doesn't type anything

    epoch_start,
    epoch_end,
  };

  return vars;
};
