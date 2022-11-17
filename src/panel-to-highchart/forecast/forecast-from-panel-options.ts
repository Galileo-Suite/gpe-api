import { HighchartsOptions, HighchartsPanelOptions } from '../../types'
import { DataFrame } from '@grafana/data'
import { forecastFromDataFrame } from './forecast-from-dataframe'
import merge from 'lodash.merge'


export const forecastFromPanelOptions = (dataframes: DataFrame[], options: HighchartsPanelOptions): HighchartsOptions => {
  const {highchartForecastOptions} = options

  // if (highchartForecastOptions.enabled === false) {
  //   return {};
  // }

  const hcOptions: HighchartsOptions = {
    xAxis: {
      type: 'datetime'
    }
  }

  const series = forecastFromDataFrame(dataframes, options)
  hcOptions.series = series

  merge(hcOptions.series, series)

  return hcOptions
}
