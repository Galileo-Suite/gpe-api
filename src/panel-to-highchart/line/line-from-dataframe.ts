import {DataFrame } from '@grafana/data'
import { getFieldDisplayName } from '@grafana/data';
import {SimpleSeries, HighchartsDataPoint, HighchartsPanelOptions} from '../../types'


export const lineFromDataFrame = (dataframes: DataFrame[], {globalOptions}: HighchartsPanelOptions): SimpleSeries[] => {
  const { unit: setUnit } = globalOptions
  let series: SimpleSeries[] = []
  let time: number[] | null = null
  dataframes.forEach(frame=>{
    time = time ? time : frame.fields.find(f=>f.type=='time')?.values.toArray() as number[]
    frame.fields.map(f => {
      const unit = f.config.unit
      if( f.type !== 'number') {
        return;
      }
      let data: HighchartsDataPoint[] = []
      f.values.toArray().forEach((d:number,i)=> {
        if (time) { // user selects null -> set unit null, user leaves undefined -> set dataframe unit if exists otherwise null
          data.push({x: time[i], y: d, custom:{ unit: setUnit === undefined?  unit ?? null : setUnit }, name:''})
        }
      })
      let seriesDef: SimpleSeries = { data, name: getFieldDisplayName(f,frame, dataframes), type: 'line'}
      series.push(seriesDef)
    })
  })
  return series
}
