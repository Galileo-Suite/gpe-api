import { GpeQuery } from '../../types/query';
import { ForecastOpts, ItemsWithMetricsQueryVariables } from '../queries/queries';

export const buildForecastVars = (
  target: Partial<GpeQuery>
): ForecastOpts => {
  const {
    forecast
  } = target

  let vars: ForecastOpts = {
   ...forecast
  };

  return vars;
};
