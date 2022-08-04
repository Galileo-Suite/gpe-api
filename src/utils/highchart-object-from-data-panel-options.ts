import { DataFrame } from '@grafana/data'
import merge from 'lodash.merge'
import defaults from 'lodash.defaults'
import { highchartsPieFromDataFrame } from './highcharts-pie-from-dataframe'
import {darkHighchartsTheme} from './dark-highcharts-theme'
import Highcharts from 'highcharts'
import { HighchartsPanelOptions, defaultHighchartsPanelOptions } from '../types'

const disableAnimations = {
  plotOptions: {
    pie:{
      animation: {duration: 0}
    },
    line:{
      animation: {duration: 0}
    },
    
  }
}

export const highchartObjectFromDataPanelOptions = (data: DataFrame[], options: HighchartsPanelOptions) => {
  options = defaults(options, defaultHighchartsPanelOptions)
  const hcOptions:Highcharts.Options = {
    series: highchartsPieFromDataFrame(data)
  }
  merge(hcOptions, disableAnimations)
  
  if (options.useDarkTheme) {
    merge(hcOptions, darkHighchartsTheme, {chart:{backgroundColor:'transparent'}})
  } 
  merge(hcOptions, options.highchartOptions)
  
  return hcOptions 
}