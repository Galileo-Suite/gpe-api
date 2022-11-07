import { GpeQuery } from '../../types/query';
import { ItemsWithMetricsQueryVariables } from '../queries/queries';
import { buildSelectorVars } from './build-selector-vars'
import { buildSummaryVars } from './build-summary-vars'


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

    configs: configs ?? [],
    formulas: formulas?.map(f=>typeof f === 'string'? f : f.formula).filter(f=>f !== "" ) ?? [], // incase user inputs empty string, if user add a formula but doesn't type anything

    use_forecast: use_forecast ?? false,
    frequency,
    periods,
    flexibility,

    epoch_start,
    epoch_end,
  };

  return vars;
};
