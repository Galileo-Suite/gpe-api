import {DataFrame, getFieldDisplayName } from '@grafana/data'
import Highcharts from 'highcharts'


interface data extends Highcharts.PointOptionsObject {
  name:string
}
interface simplePieSeriesOption {
  type: 'pie',
  data: data[]
}

export const highchartsPieFromDataFrame = (dataframes: DataFrame[]): simplePieSeriesOption[] => {
  let series:  simplePieSeriesOption[] = []
  dataframes.forEach(frame=>{
    const data = frame.fields.map(f=> {
      const y:number = f.values.toArray()[0]
      const name = getFieldDisplayName(f,frame, dataframes)
      return {name, y}
    } )
    let seriesDef:  simplePieSeriesOption = { type:'pie',  data }
    series.push(seriesDef)
  })
  return series
}
