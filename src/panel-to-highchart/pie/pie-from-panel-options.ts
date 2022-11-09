import { HighchartsOptions, HighchartsPanelOptions } from '../../types'
import {DataFrame } from '@grafana/data'
import Highcharts, { SeriesPieOptions } from 'highcharts'
import { pieFromDataFrame } from './pie-from-dataframe';

export const pieFromPanelOptions = (dataframes: DataFrame[], options: HighchartsPanelOptions): HighchartsOptions => {
  const  {highchartPieOptions}= options
  if (highchartPieOptions.enabled === false) {
    return {series: pieFromDataFrame(dataframes, options)}
  }
  const hcOptions: HighchartsOptions= {
    chart:{
      type:'pie',
      options3d: { }
    },
    plotOptions:{
      pie: { },
    }
  }

  if (!(hcOptions.plotOptions?.pie && hcOptions.chart?.options3d)) {
    return hcOptions
  }

  const pieOptions = {
    ...hcOptions.plotOptions.pie,
    innerSize: `${highchartPieOptions.innerSize}%`,
    startAngle: highchartPieOptions.startAngle,
    endAngle: highchartPieOptions.endAngle,
    slicedOffset: highchartPieOptions.slicedOffset,
  }
  hcOptions.plotOptions.pie = pieOptions
  hcOptions.plotOptions.item = {...hcOptions.plotOptions.item, ...pieOptions}

  const series = pieFromDataFrame(dataframes, options)
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
  hcOptions.series = series

  return hcOptions
}
