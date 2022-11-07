import { DataFrame } from '@grafana/data'
import merge from 'lodash.merge'
import defaults from 'lodash.defaults'
import {darkHighchartsTheme} from '../utils/dark-highcharts-theme'
import Highcharts from 'highcharts'
import { HighchartsPanelOptions, defaultHighchartsPanelOptions } from '../types'

import {lineFromPanelOptions} from './line/line-from-panel-options'
import {pieFromPanelOptions} from './pie/pie-from-panel-options'
import {itemFromPanelOptions} from './item/item-from-panel-options'

const defaultPlotOptions = {
  animation: {duration: 0}
}

export const highchartObjectFromDataPanelOptions = (data: DataFrame[], options: HighchartsPanelOptions) => {
  options = defaults(options, defaultHighchartsPanelOptions)
  const hcOptions:Highcharts.Options = {
    colors: ["#6883BA", "#8DB38B", "#FF6542", "#B7245C", "#F5BB00", "#372549", "#C2F970", "#8C2F39", "#F4CAE0"],
    title:{
      text: options.globalOptions.title
    },
    credits:{
      enabled: false
    },
    tooltip: {
      // pointFormat: options.globalOptions.tooltipFormat // need to add this back later
      pointFormat: undefined
    },
    plotOptions:{
      pie: {
        depth: options.globalOptions.depth3d,
        dataLabels: {
          format: options.globalOptions.labelFormat
        }
      },
      item: {
        dataLabels: {
          format: options.globalOptions.labelFormat
        }
      }
    },
    chart:{
      options3d:{
        alpha: options.globalOptions.alpha3d,
        beta: options.globalOptions.beta3d,
        enabled: options.globalOptions.options3dEnabled
      }
    }
  }

  if (options.globalOptions.useDarkTheme) {
    merge(hcOptions, darkHighchartsTheme, {   chart:{ backgroundColor: 'transparent' }})
  }

  switch (options.highchartType) {
    case 'line':
      merge(hcOptions, {plotOptions:{line: defaultPlotOptions}}, lineFromPanelOptions(options.highchartLineOptions, data))
      break;
      case 'pie':
      merge(hcOptions, {plotOptions:{pie: defaultPlotOptions}}, pieFromPanelOptions(options.highchartPieOptions, data))
      break;
      case 'item':
      merge(hcOptions, {plotOptions:{item: defaultPlotOptions}}, itemFromPanelOptions(options.highchartItemOptions, data))
      break;
    default:
      throw new Error(`${options.highchartType} is not valid`)
  }

  merge(hcOptions, options.HighchartJsonOverrideOptions.hcOptions)

  return hcOptions
}
