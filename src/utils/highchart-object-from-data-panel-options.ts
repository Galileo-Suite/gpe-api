import { DataFrame } from '@grafana/data'
import merge from 'lodash.merge'
import defaults from 'lodash.defaults'
import { highchartsPieFromDataFrame } from '../panel-to-highchart/pie/highcharts-pie-from-dataframe'
import {darkHighchartsTheme} from './dark-highcharts-theme'
import Highcharts from 'highcharts'
import { HighchartsPanelOptions, defaultHighchartsPanelOptions } from '../types'

import { highchartsLineFromDataFrame } from '../panel-to-highchart/line/highcharts-line-from-dataframe'
import {highchartsLineFromPanelOptions} from '../panel-to-highchart/line/highcharts-line-from-panel-options'
import {highchartsPieFromPanelOptions} from '../panel-to-highchart/pie/highcharts-pie-from-panel-options'

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

  if (options.globalOptions.useDarkTheme) {
    merge(hcOptions, darkHighchartsTheme, {   chart:{ backgroundColor: 'transparent' }})
  }

  switch (options.highchartType) {
    case 'line':
      merge(hcOptions, highchartsLineFromDataFrame(data), highchartsLineFromPanelOptions(options.highchartLineOptions))
      break;
      case 'pie':
      merge(hcOptions, highchartsPieFromDataFrame(data), highchartsPieFromPanelOptions(options.highchartPieOptions))
      break;
    default:
      throw new Error(`${options.highchartType} is not valid`)
  }

  return hcOptions
}
