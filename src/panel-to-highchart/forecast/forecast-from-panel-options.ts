import { HighchartsOptions, HighchartsPanelOptions } from '../../types'
import { DataFrame } from '@grafana/data'
import { forecastFromDataFrame } from './forecast-from-dataframe'
import merge from 'lodash.merge'
import { defaultGlobalColors } from '../highchart-object-from-data-panel-options'
import { darkHighchartsTheme } from '../../utils'


export const forecastFromPanelOptions = (dataframes: DataFrame[], options: HighchartsPanelOptions): HighchartsOptions => {
  const {highchartForecastOptions} = options

  // if (highchartForecastOptions.enabled === false) {
  //   return {};
  // }

  const hcOptions: HighchartsOptions = {
    xAxis: {
      type: 'datetime'
    }
  }

  const series = forecastFromDataFrame(dataframes, options)

  let colors = defaultGlobalColors

  if (options.globalOptions.useDarkTheme) {
    colors = darkHighchartsTheme.colors ?? []
  }

  let systems = []

  let rangeLineType: string
  let lineType: string

  if (highchartForecastOptions.pointType === 'spline') {
    rangeLineType = 'areasplinerange'
    lineType = 'spline'
  } else {
    rangeLineType = 'arearange'
    lineType = 'line'
  }

  // let color = 'rgba(202, 210, 197, 0.25)'

  series.forEach(s => {
    s.marker = {}
    if (s.marker !== undefined) {
      if (s.name?.includes('upper') && 'marker' in s) {
        s.color =  `rgba(202, 210, 197, 1)`,
        s.fillColor =  `rgba(202, 210, 197, ${highchartForecastOptions.fillOpacity})`,
        s.showInLegend = false,
        s.visible = highchartForecastOptions.showRange,
        s.type = rangeLineType,
        s.lineWidth = highchartForecastOptions.rangeLineWidth,
        s.marker.enabled = highchartForecastOptions.rangeMarker,
        s.marker.radius = highchartForecastOptions.markerRadius,
        s.marker.symbol = 'circle'
      } else if (s.name?.includes('forecast')) {
        s.color = '#5B618A',
        s.showInLegend = false,
        s.type = lineType,
        s.visible = highchartForecastOptions.showForecast,
        s.lineWidth = highchartForecastOptions.forecastLineWidth,
        s.marker.enabled = highchartForecastOptions.forecastMarker ,
        s.marker.radius = highchartForecastOptions.markerRadius,
        s.marker.symbol = 'circle'
      } else {
        s.color = '#9EADC8',
        s.type = lineType,
        s.lineWidth = highchartForecastOptions.lineWidth,
        s.marker.enabled = highchartForecastOptions.marker
        s.marker.radius = highchartForecastOptions.markerRadius,
        s.marker.symbol = 'circle'
      }
    }
  })

  hcOptions.series = series

  merge(hcOptions.series, series)

  let click = {
    plotOptions: {
      series: {
        events: {       
          legendItemClick: function (this: Highcharts.Series) {
            console.log(this)
            let name = this.name
            let state = this.visible
            let newState = false
            if (state === false) {
              newState = true
            } 

            this.chart.series.forEach(s => {
              if (s.name.includes(name)) {
                //@ts-ignore
                s.update({
                  visible: newState
                })
              }
            })
            return false
          }
        }
      }
    }
  }

  merge(hcOptions, click)

  return hcOptions
}
