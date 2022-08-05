import {DataFrame } from '@grafana/data'
import Highcharts from 'highcharts'

export const highchartsPieFromDataFrame = (dataframes: DataFrame[]): Highcharts.Options => {
  // (dataframes: DataFrame[]) => Highcharts.SeriesOptionsType[]
  let series:  Highcharts.SeriesOptionsType[] = []
  dataframes.forEach(frame=>{
    const data = frame.fields.map(f=> {
      const y = f.values.toArray()[0]
      const name = f.config.displayName ?? f.name
      return {name, y}
    } )
    let seriesDef:  Highcharts.SeriesOptionsType = { type:'pie',  data }
    series.push(seriesDef)
  })
  return {series}
}