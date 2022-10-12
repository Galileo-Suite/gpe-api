import { HighchartsPanelOptions } from '../../types'
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

export const lineFromPanelOptions = (panelOptions: HighchartsPanelOptions['highchartLineOptions'], dataframes: DataFrame[]): Highcharts.Options => {
  if (panelOptions.enabled === false) {
    return {};
  }

  const hcOptions: Highcharts.Options = {
    xAxis: {
      type: 'datetime'
    }
  }

  const series = lineFromDataFrame(dataframes)
  hcOptions.series = series as Highcharts.SeriesOptionsType[]

  hcOptions.chart = {...hcOptions.chart}
  hcOptions.chart.type = getChartType(panelOptions)

  merge(hcOptions, {
    plotOptions: {
      series: {
        lineWidth: panelOptions.lineWidth,
        marker: {
          enabled: panelOptions.marker,
          radius: panelOptions.markerRadius,
          symbol: 'circle'
        },
        shadow: getShadow(panelOptions),
        ...getColumnOps(panelOptions)
      },
      line: {
        stacking: panelOptions.stacking
      },
      column: {
        stacking: panelOptions.stacking,
        opacity: panelOptions.opacity
      },
      area: {
        stacking: panelOptions.stacking,
        fillOpacity: panelOptions.opacity
      },
      spline: {
        stacking: panelOptions.stacking
      },
      areaspline: {
        stacking: panelOptions.stacking,
        fillOpacity: panelOptions.opacity
      }
    }
  })

  const selected = panelOptions.selectedSeries

  series.forEach(s => {
    if (selected === s.name) {
      s = merge(s, {...panelOptions.seriesOptions})
    }
  })
  merge(hcOptions.series, series)

  return hcOptions
}
