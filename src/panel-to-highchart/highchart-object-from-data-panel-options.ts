import { DataFrame } from '@grafana/data'
import { findBestUnit, optmizeHcOptions as optmizeUnitsHcOptions } from '../utils/optimize-unit'
import merge from 'lodash.merge'
import defaults from 'lodash.defaults'
import {darkHighchartsTheme} from '../utils/dark-highcharts-theme'
import { HighchartsPanelOptions, defaultHighchartsPanelOptions, HighchartsOptions } from '../types'
import {lineFromPanelOptions} from './line/line-from-panel-options'
import {pieFromPanelOptions} from './pie/pie-from-panel-options'
import {itemFromPanelOptions} from './item/item-from-panel-options'
import {forecastFromPanelOptions} from './forecast/forecast-from-panel-options'
import {applyGrafanaVars} from '../utils'

const defaultPlotOptions = {
  animation: {duration: 0}
}

export const defaultGlobalColors = ["#6883BA", "#8DB38B", "#FF6542", "#B7245C", "#F5BB00", "#372549", "#C2F970", "#8C2F39", "#F4CAE0"]

export const highchartObjectFromDataPanelOptions = (data: DataFrame[], options: HighchartsPanelOptions) => {
  options = defaults(options, defaultHighchartsPanelOptions)
  let hcOptions: HighchartsOptions = {
    colors: defaultGlobalColors,
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
      series: {
        animation: {
          duration: 0
        }
      },
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
      merge(hcOptions, {plotOptions:{line: defaultPlotOptions, }}, lineFromPanelOptions(data, options))
      break;
      case 'pie':
      merge(hcOptions, {plotOptions:{pie: defaultPlotOptions}}, pieFromPanelOptions(data, options))
      break;
      case 'item':
      merge(hcOptions, {plotOptions:{item: defaultPlotOptions}}, itemFromPanelOptions(data, options))
      break;
      case 'forecast':
      merge(hcOptions, {plotOptions:{arearange: defaultPlotOptions, areasplinerange: defaultPlotOptions, line: defaultPlotOptions, spline: defaultPlotOptions, scatter: defaultPlotOptions}}, forecastFromPanelOptions(data, options))
      break;
    default:
      throw new Error(`${options.highchartType} is not valid`)
  }

  let title = {
    text: options.globalOptions.yAxisTitle
  }

  let outUnit = null
  let unitSpecified = false
  data.forEach(d=>{
    d.fields.forEach(f=>{
      if (f.config.unit) {
        unitSpecified = true
      }
    })
  })
  if ( !(options.globalOptions.unit === 'none' || (options.globalOptions.unit === undefined && !unitSpecified)) ) {
    outUnit = options.globalOptions.outUnit ? options.globalOptions.outUnit : findBestUnit(hcOptions, options.globalOptions.unit ?? 'iB' )
    optmizeUnitsHcOptions(hcOptions, outUnit)
    title = {
      text: applyGrafanaVars(
        { yAxisTitle: options.globalOptions.yAxisTitle },
        { unit: {value: outUnit ?? '', text:'unit'} },
        { start:'{', end: '}' }
      ).yAxisTitle
    }
  }

  merge(hcOptions, {yAxis:[{title}]})

  merge(hcOptions, {time:{timezone: options.globalOptions.timezone}})

  merge(hcOptions, options.HighchartJsonOverrideOptions.hcOptions)

  return hcOptions
}

