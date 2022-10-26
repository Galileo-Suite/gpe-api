import { GpeQuery } from '../../types/query';
import { ItemsWithMetricsQueryVariables } from '../queries/queries';


type forecastQueryVariables = Pick<ItemsWithMetricsQueryVariables,
  'use_forecast' | 'frequency' | 'periods' | 'flexibility'
>

export const buildForecastVars = (
  target: Partial<GpeQuery>
): forecastQueryVariables => {
  let {
    use_forecast,
    frequency,
    periods,
    flexibility,
  } = target;

  if (parseInt(periods ?? "0").toString() !== periods ) {
    console.warn('invalid periods value, make sure input can be parsed to interger! Setting periods to 30')
    periods = '30'
  }
  if (parseFloat(flexibility ?? "0").toString() !== flexibility ) {
    console.warn('invalid flexibility value, make sure input can be parsed to float! setting flexibility = 0.05')
    flexibility = '0.05'
  }

  let vars: forecastQueryVariables = {
    use_forecast: use_forecast ?? false,
    frequency,
    periods: parseInt(periods),
    flexibility: parseFloat(flexibility),
  };

  return vars;
};
