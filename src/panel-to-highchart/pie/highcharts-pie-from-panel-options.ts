import { HighchartsPanelOptions } from '../../types'
import {DataFrame } from '@grafana/data'
import Highcharts from 'highcharts'
import { highchartsPieFromDataFrame } from './highcharts-pie-from-dataframe';

export const highchartsPieFromPanelOptions = (highchartPieOptions: HighchartsPanelOptions['highchartPieOptions'], dataframes: DataFrame[]): Highcharts.Options => {
  if (highchartPieOptions.enabled === false) {
    return {series: highchartsPieFromDataFrame(dataframes)};
  }
  const hcOptions: Highcharts.Options = {
    chart:{
      options3d:{}
    },
    plotOptions:{
      pie: { },
    }
  }
  if (!(hcOptions.plotOptions?.pie && hcOptions.chart?.options3d)) {
    return hcOptions
  }

  hcOptions.plotOptions.pie.innerSize = `${highchartPieOptions.innerSize}%`
  hcOptions.plotOptions.pie.startAngle = highchartPieOptions.startAngle
  hcOptions.plotOptions.pie.endAngle = highchartPieOptions.endAngle
  hcOptions.plotOptions.pie.slicedOffset = highchartPieOptions.slicedOffset

  const series = highchartsPieFromDataFrame(dataframes)
  let selected:string[] = []
  if (highchartPieOptions.slicedOptions == 'all') {
    series.forEach(s=>s.data.forEach(d=>selected.push(d.name)))
  } else if (highchartPieOptions.slicedOptions === 'selected') {
    selected = highchartPieOptions.multiSlice ?? []
  }

  series.forEach(s => {
    s.data?.forEach(d => {
      if (selected.includes(d.name)) {
        d.sliced = true
      }
    })
  })


  hcOptions.series = series

  return hcOptions
}
