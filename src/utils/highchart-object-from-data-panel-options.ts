import { DataFrame } from '@grafana/data'
import merge from 'lodash.merge'
import defaults from 'lodash.defaults'
import { highchartsPieFromDataFrame } from './highcharts-pie-from-dataframe'
import {darkHighchartsTheme} from './dark-highcharts-theme'
import Highcharts from 'highcharts'
import { HighchartsPanelOptions, defaultHighchartsPanelOptions } from '../types'
import { highchartsLineFromDataFrame } from './highcharts-line-from-dataframe'

const disableAnimations = {
  plotOptions: {
    pie:{
      animation: {duration: 0}
    },
    line:{
      animation: {duration: 0}
    }
  }
}

export const highchartObjectFromDataPanelOptions = (data: DataFrame[], options: HighchartsPanelOptions) => {
  options = defaults(options, defaultHighchartsPanelOptions)
  const hcOptions:Highcharts.Options = {
    credits:{
      enabled: false
    },
  }
  merge(hcOptions, disableAnimations)
  
  if (options.useDarkTheme) {
    merge(hcOptions, darkHighchartsTheme, {   chart:{ backgroundColor: 'transparent' }})
  } 
  switch (options.highchartsType) {
    case 'line':
      merge(hcOptions, highchartsLineFromDataFrame(data), options.highchartOptions.line)
      break;
      case 'pie':
      merge(hcOptions, highchartsPieFromDataFrame(data), options.highchartOptions.pie)
      break;
    case 'custom':
      try {
        const func = new Function('data', options.conversionFunction.custom)
        merge(hcOptions, func(data), options.highchartOptions.custom)
      } catch (e) {
        console.log(e)
        throw new Error('Function passed errored out!')
      }
      break;
    default:
      throw new Error(`${options.highchartsType} is not valid`)
  }
  
  return hcOptions 
}