import { HighchartsPanelOptions } from '../../types'
import Highcharts from 'highcharts'
import { DataFrame } from '@grafana/data'
import { highchartsLineFromDataFrame } from './highcharts-line-from-dataframe'

export const highchartsLineFromPanelOptions = (panelOptions: HighchartsPanelOptions['highchartLineOptions'], dataframes: DataFrame[]): Highcharts.Options => {
  if (panelOptions.enabled === false) {
    return {};
  }
  const hcOptions: Highcharts.Options = {}

  const series = highchartsLineFromDataFrame(dataframes)
  hcOptions.series = series

  return hcOptions
}
