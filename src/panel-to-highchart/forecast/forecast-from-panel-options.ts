import { HighchartsOptions, HighchartsPanelOptions } from '../../types'
import { DataFrame } from '@grafana/data'
import { forecastFromDataFrame } from './forecast-from-dataframe'
import merge from 'lodash.merge'
import { defaultGlobalColors } from '../highchart-object-from-data-panel-options'
import { darkHighchartsTheme } from '../../utils'


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

  let colors = defaultGlobalColors

  if (options.globalOptions.useDarkTheme) {
    colors = darkHighchartsTheme.colors ?? []
  }

  let systems = []

  series.forEach(s => {
    console.log(s)
    if (s.name?.includes('upper')) {
      s.color = '#CAD2C533'
    } else if (s.name?.includes('forecast')) {
      s.color = '#5B618A'
    } else {
      s.color = '#9EADC8'
    }
  })

  hcOptions.series = series

  merge(hcOptions.series, series)

  return hcOptions
}
