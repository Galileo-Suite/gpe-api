import { HighchartsPanelOptions } from '../../types'
import {DataFrame } from '@grafana/data'
import Highcharts, { SeriesOptionsType, SeriesPieOptions } from 'highcharts'
import { highchartsPieFromDataFrame } from './highcharts-pie-from-dataframe';
import merge from 'lodash.merge';

export const highchartsPieFromPanelOptions = (highchartPieOptions: HighchartsPanelOptions['highchartPieOptions'], dataframes: DataFrame[]): Highcharts.Options => {
  if (highchartPieOptions.enabled === false) {
    return {series: highchartsPieFromDataFrame(dataframes) as SeriesPieOptions[]};
  }
  const hcOptions: Highcharts.Options = merge(highchartPieOptions,{
    chart:{
      type:'pie',
      options3d: { }
    },
    plotOptions:{
      pie: { },
    }
  })

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
    series.forEach(s=>s.data?.forEach(d=>selected.push(d.name)))
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

//doing this cuz i don't want type to bedefined there
  hcOptions.series = series as SeriesPieOptions[]

  return hcOptions
}
