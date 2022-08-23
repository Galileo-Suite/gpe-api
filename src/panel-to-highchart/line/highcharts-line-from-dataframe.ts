import {DataFrame } from '@grafana/data'
import Highcharts from 'highcharts'

export const highchartsLineFromDataFrame = (dataframes: DataFrame[]):Highcharts.SeriesLineOptions[] => {
  let series: Highcharts.SeriesLineOptions[] = []
  dataframes.forEach(frame=>{
    const time = frame.fields.find(f=>f.type=='time')?.values.toArray()
    if (time) {
      frame.fields.map(f => {
        if( f.type !== 'number') {
          return;
        }
        let data: number[][] = []
        f.values.toArray().forEach((d:number,i)=> {
          data.push([time[i],d])
        })
        let seriesDef: Highcharts.SeriesLineOptions = { type:'line', data, name: f.config.displayName ?? `${frame.name} ${f.name}` }

        series.push(seriesDef)
      })
    }
  })
  return series
}
