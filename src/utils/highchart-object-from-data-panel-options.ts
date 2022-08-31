import { DataFrame } from '@grafana/data'
import merge from 'lodash.merge'
import defaults from 'lodash.defaults'
import {darkHighchartsTheme} from './dark-highcharts-theme'
import Highcharts from 'highcharts'
import { HighchartsPanelOptions, defaultHighchartsPanelOptions } from '../types'

import {highchartsLineFromPanelOptions} from '../panel-to-highchart/line/highcharts-line-from-panel-options'
import {highchartsPieFromPanelOptions} from '../panel-to-highchart/pie/highcharts-pie-from-panel-options'

const defaultPlotOptions = {
  animation: {duration: 0}
}

const linePlotOptions = {
  plotOptions:{
    line: defaultPlotOptions, 
    column: defaultPlotOptions, 
    area: defaultPlotOptions, 
    spline: defaultPlotOptions, 
    areaspline: defaultPlotOptions
  }
}

export const highchartObjectFromDataPanelOptions = (data: DataFrame[], options: HighchartsPanelOptions) => {
  options = defaults(options, defaultHighchartsPanelOptions)
  const hcOptions:Highcharts.Options = {
    colors: ["#6883BA", "#8DB38B", "#FF6542", "#B7245C", "#F5BB00", "#372549", "#C2F970", "#8C2F39", "#F4CAE0"],
    credits:{
      enabled: false
    },
    chart:{
      options3d:{
        enabled: true
      }
    },
  }

  if (options.globalOptions.useDarkTheme) {
    merge(hcOptions, darkHighchartsTheme, {   chart:{ backgroundColor: 'transparent' }})
  }


  switch (options.highchartType) {
    case 'line':
      merge(hcOptions, linePlotOptions, highchartsLineFromPanelOptions(options.highchartLineOptions, data))
      break;
      case 'pie':
      merge(hcOptions, {plotOptions:{pie: defaultPlotOptions}}, highchartsPieFromPanelOptions(options.highchartPieOptions, data))
      break;
    default:
      throw new Error(`${options.highchartType} is not valid`)
  }

  merge(hcOptions, options.HighchartJsonOverrideOptions.hcOptions)

  return hcOptions
}
