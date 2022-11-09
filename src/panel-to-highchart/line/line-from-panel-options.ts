import { HighchartsOptions, HighchartsPanelOptions } from '../../types'
import Highcharts from 'highcharts'
import { DataFrame } from '@grafana/data'
import { lineFromDataFrame } from './line-from-dataframe'
import merge from 'lodash.merge'
import { OptionsUIRegistryBuilder } from '@grafana/data/types/OptionsUIRegistryBuilder'

const getChartType = (panelOptions: HighchartsPanelOptions['highchartLineOptions']) => {
  if (panelOptions.pointType === 'column') {
    return 'column'
  }
  if (panelOptions.area && panelOptions.pointType === 'spline') {
    return 'areaspline'
  }
  if (panelOptions.pointType === 'spline') {
    return 'spline'
  }
  if (panelOptions.area) {
    return 'area'
  }
  return panelOptions.pointType
}

const getShadow = (panelOptions: HighchartsPanelOptions['highchartLineOptions']) => {
  // if (!panelOptions.shadow || panelOptions.pointType === 'column') {
  if (!panelOptions.shadow) {
    return false
  }
  return {
      offsetX: (panelOptions.shadowIntensity)*.35,
      offsetY: (panelOptions.shadowIntensity)*.35,
      opacity: 1/(panelOptions.shadowIntensity),
      width: (panelOptions.shadowIntensity)*1.5
  }
}

const getColumnOps = (panelOptions: HighchartsPanelOptions['highchartLineOptions']) => {
  if (panelOptions.pointType !== 'column') {
    return
  }
  return {
      borderRadius: panelOptions.borderRadius,
      borderWidth: panelOptions.borderWidth,
      groupPadding: panelOptions.groupPadding,
      pointPadding: panelOptions.pointPadding
  }
}

export const lineFromPanelOptions = (dataframes: DataFrame[], options: HighchartsPanelOptions): HighchartsOptions => {
  const {highchartLineOptions} = options

  if (highchartLineOptions.enabled === false) {
    return {};
  }

  const hcOptions: HighchartsOptions = {
    xAxis: {
      type: 'datetime'
    }
  }

  const series = lineFromDataFrame(dataframes, options)
  hcOptions.series = series

  hcOptions.chart = {...hcOptions.chart}
  hcOptions.chart.type = getChartType(highchartLineOptions)

  merge(hcOptions, {
    plotOptions: {
      series: {
        lineWidth: highchartLineOptions.lineWidth,
        marker: {
          enabled: highchartLineOptions.marker,
          radius: highchartLineOptions.markerRadius,
          symbol: 'circle'
        },
        shadow: getShadow(highchartLineOptions),
        ...getColumnOps(highchartLineOptions)
      },
      line: {
        stacking: highchartLineOptions.stacking
      },
      column: {
        stacking: highchartLineOptions.stacking,
        opacity: highchartLineOptions.opacity
      },
      area: {
        stacking: highchartLineOptions.stacking,
        fillOpacity: highchartLineOptions.opacity
      },
      spline: {
        stacking: highchartLineOptions.stacking
      },
      areaspline: {
        stacking: highchartLineOptions.stacking,
        fillOpacity: highchartLineOptions.opacity
      }
    }
  })

  const selected = highchartLineOptions.selectedSeries

  series.forEach(s => {
    if (selected === s.name) {
      s = merge(s, {...highchartLineOptions.seriesOptions})
    }
  })
  merge(hcOptions.series, series)

  return hcOptions
}
