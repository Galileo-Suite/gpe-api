import {DataFrame } from '@grafana/data'
import Highcharts from 'highcharts'
import { getFieldDisplayName } from '@grafana/data';

type OmitType<T> = Omit<T, 'type'>
type lineOptions = OmitType<Highcharts.SeriesLineOptions> | OmitType<Highcharts.SeriesBarOptions> | OmitType<Highcharts.SeriesColumnOptions> | OmitType<Highcharts.SeriesAreaOptions> & {type?:string}
export const highchartsLineFromDataFrame = (dataframes: DataFrame[]): lineOptions[] => {
  let series: lineOptions[] = []
  let time: number[] | null = null
  dataframes.forEach(frame=>{
    time = time ? time : frame.fields.find(f=>f.type=='time')?.values.toArray() as number[]
    frame.fields.map(f => {
      if( f.type !== 'number') {
        return;
      }
      let data: number[][] = []
      f.values.toArray().forEach((d:number,i)=> {
        if (time) {
          data.push([time[i],d])
        }
      })
      let seriesDef: lineOptions = { data, name: getFieldDisplayName(f,frame, dataframes) }
      series.push(seriesDef)
    })
  })
  return series
}
