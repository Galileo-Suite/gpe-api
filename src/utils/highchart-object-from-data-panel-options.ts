import { DataFrame } from '@grafana/data'
import merge from 'lodash.merge'
import defaults from 'lodash.defaults'
import { highchartsPieFromDataFrame } from './highcharts-pie-from-dataframe'
import {darkHighchartsTheme} from './dark-highcharts-theme'
import Highcharts from 'highcharts'
import { HighchartsPanelOptions, defaultHighchartsPanelOptions } from '../types'

export const highchartObjectFromDataPanelOptions = (data: DataFrame[], options: HighchartsPanelOptions) => {
  options = defaults(options, defaultHighchartsPanelOptions)
  const hcOptions:Highcharts.Options = {
    series: highchartsPieFromDataFrame(data)
  }
  merge(hcOptions, options.highchartOptions)
  
  if (options.useDarkTheme) {
    merge(hcOptions, darkHighchartsTheme, {chart:{backgroundColor:'transparent'}})
  } 
  
  return hcOptions 
}