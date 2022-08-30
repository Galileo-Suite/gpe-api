import { HighchartsBarOptions, HighchartsPanelOptions } from '../../types'
import Highcharts from 'highcharts'
import { DataFrame } from '@grafana/data'
import { highchartsLineFromDataFrame } from './highcharts-line-from-dataframe'
import merge from 'lodash.merge'
import { OptionsUIRegistryBuilder } from '@grafana/data/types/OptionsUIRegistryBuilder'

export const highchartsLineFromPanelOptions = (panelOptions: HighchartsPanelOptions['highchartLineOptions'], dataframes: DataFrame[]): Highcharts.Options => {
  if (panelOptions.enabled === false) {
    return {};
  }

  const hcOptions: Highcharts.Options = {}

  const series = highchartsLineFromDataFrame(dataframes)
  hcOptions.series = series

  merge(hcOptions, {
    series: series.map(s => {
      if (panelOptions.pointType === 'point') {
        s = s as Highcharts.SeriesLineOptions
        s.marker = {
          ...s.marker
        }
        s.type = "line",
        s.lineWidth = 0,
        s.marker.enabled = true,
        s.marker.radius = 2
      } else if (panelOptions.pointType === 'column') {
        s.type = panelOptions.pointType
      } else if (panelOptions.pointType === 'line') {
        s = s as Highcharts.SeriesLineOptions
        s.marker = {
          ...s.marker
        }
        s.type = "line",
        s.lineWidth = 1,
        s.marker.enabled = false
      }
      return s
    })
  })

  merge(hcOptions, {
    plotOptions: {
      line: {
        stacking: panelOptions.stacking
      },
      column: {
        stacking: panelOptions.stacking
      }
    }
  })

  console.log(panelOptions)

  return hcOptions
}
