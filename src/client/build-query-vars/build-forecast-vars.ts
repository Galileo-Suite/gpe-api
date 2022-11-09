
import { GpeQuery } from '../../types/query';
import { ItemsWithMetricsQueryVariables } from '../queries/queries';


type forecastQueryVariables = Pick<ItemsWithMetricsQueryVariables,
  'use_forecast' | 'forecast_opts'
>
export const buildForecastOpts = (
  target: Partial<GpeQuery>
): forecastQueryVariables => {
  let {
    use_forecast,
    forecast,
  } = target;

  let vars: forecastQueryVariables = {
    forecast_opts: forecast,
    use_forecast: use_forecast ?? false
  };

  return vars;
};
