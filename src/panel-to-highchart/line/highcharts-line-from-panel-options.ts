import { HighchartsBarOptions, HighchartsPanelOptions } from '../../types'
import Highcharts, { chart } from 'highcharts'
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
  hcOptions.series = series as Highcharts.SeriesOptionsType[]

  merge(hcOptions, {
    series: series.map(s => {
      if (panelOptions.pointType === 'point') {
        s = s as Highcharts.SeriesLineOptions
        s.marker = {
          ...s.marker
        }
        s.lineWidth = 0,
        s.marker.enabled = true,
        s.marker.radius = 2
      } else if (panelOptions.pointType === 'column') {
      } else if (panelOptions.pointType === 'line') {
        s = s as Highcharts.SeriesLineOptions
        s.marker = {
          ...s.marker
        }
        s.lineWidth = 1,
        s.marker.enabled = false
      }
      return s
    })
  })

  // if (panelOptions.area && panelOptions.pointType !== 'column') {
  //   series.forEach(s => {
  //     s.type = 'area'
  //   })
  // }

  merge(hcOptions, {
    plotOptions: {
      line: {
        stacking: panelOptions.stacking
      },
      column: {
        stacking: panelOptions.stacking
      },
      area: {
        stacking: panelOptions.stacking
      }
    }
  })

  console.log(panelOptions)

  return hcOptions
}
