import {DataFrame } from '@grafana/data'
import Highcharts from 'highcharts'
import { getFieldDisplayName } from '@grafana/data';


type lineOptions = (Highcharts.SeriesLineOptions | Highcharts.SeriesBarOptions | Highcharts.SeriesColumnOptions | Highcharts.SeriesAreaOptions)
export const highchartsLineFromDataFrame = (dataframes: DataFrame[]): lineOptions[] => {
  let series: lineOptions[] = []
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
        let seriesDef: lineOptions = { type:'line', data, name: getFieldDisplayName(f,frame, dataframes) }

        series.push(seriesDef)
      })
    }
  })
  return series
}
