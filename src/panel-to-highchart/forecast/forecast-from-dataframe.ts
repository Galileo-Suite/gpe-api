import {DataFrame } from '@grafana/data'
import { getFieldDisplayName } from '@grafana/data';
import { includes } from 'lodash';
import {SimpleSeries, HighchartsDataPoint, HighchartsPanelOptions, HighchartsTuplePoint} from '../../types'


export const forecastFromDataFrame = (dataframes: DataFrame[], {globalOptions}: HighchartsPanelOptions): SimpleSeries[] => {
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
      let data: HighchartsTuplePoint[] = []
      f.values.toArray().forEach((d:number,i)=> {
        if (time) { // user selects null -> set unit null, user leaves undefined -> set dataframe unit if exists otherwise null
          data.push([time[i], d])
        }
      })
      let fullName = getFieldDisplayName(f,frame,dataframes)

      const names = fullName.split('_') //everyihtng up to last '_'
      names.pop()
      const name = names.join('_') 
      console.log(fullName)
      let seriesDef: SimpleSeries

      if (fullName.includes('lower')) {
        return
      }
      
      if (fullName.includes('uppper')) {
        const upperdata = data
        const lowerdata = frame.fields.find(f=>f.name === `${name}_lower`)?.values.toArray() as number[]

        const rangedata = upperdata.map((d,i) => {
          return [d[0], lowerdata[i], d[1]]
        })

        seriesDef = {
          data: rangedata,// Add range data for upper and lower,
          name: fullName,
          type: 'arearange',
          zIndex: 1,
          custom:{ unit: setUnit === undefined?  unit ?? null : setUnit, key: name}
        }
      } else if (fullName.includes('forecast')) {
        seriesDef = { data, name: getFieldDisplayName(f,frame, dataframes), type: 'line', zIndex: 2, custom:{ unit: setUnit === undefined?  unit ?? null : setUnit, key: name }}
      } else {
        seriesDef = { data, name: getFieldDisplayName(f,frame, dataframes), type: 'scatter', zIndex: 3, custom:{ unit: setUnit === undefined?  unit ?? null : setUnit, key: name }}
      }
      series.push(seriesDef)
    })
  })
  return series
}
