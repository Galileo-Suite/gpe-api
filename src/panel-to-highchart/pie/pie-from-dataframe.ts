import {DataFrame, FieldType, getFieldDisplayName } from '@grafana/data'
import { SimpleSeries, HighchartsDataPoint, HighchartsPanelOptions } from '../../types'


type Opts = {setUnit?:string}
export const pieFromDataFrame = (dataframes: DataFrame[], {globalOptions}: HighchartsPanelOptions): SimpleSeries[] => {
  const {unit: setUnit} = globalOptions

  let series:  SimpleSeries[] = []

  //case when pie is streched across dataframe
  const allfieldsLengths = dataframes.map(d=>d.fields.map(f=>f.values.toArray().length)).flat()
  if (Math.max(...allfieldsLengths) === 1) {
    dataframes.forEach(frame=>{
      const data: HighchartsDataPoint[] = frame.fields.map(f=> {
        const y:number = f.values.toArray()[0]
        const name = getFieldDisplayName(f,frame, dataframes)
        let custom:any = {pretty: y, prettyValue: y, name, unit: setUnit === undefined? f.config.unit ?? null : setUnit}
        return {name, y, custom}
      } )
      let seriesDef:  SimpleSeries = { data, type: 'pie' }
      series.push(seriesDef)
    })
    return series
  }

  dataframes.forEach(frame=>{
    const data: HighchartsDataPoint[] = []
    const labelField = frame.fields.find(f=> f.type === FieldType.string || Array.isArray(f.values.get(0)) )
    const valueField = frame.fields.find(f=> f.type === FieldType.number && !Array.isArray(f.values.get(0)))
    if (labelField === undefined ) {
      console.warn('Could not find label field')
      return []
    }
    if (valueField === undefined ) {
      console.warn('Could not find value field')
      return []
    }
    for (let i = 0; i < labelField.values.length; i++) {
      //doing this to handle array as title cases with reduce row field calculation
      const name = Array.isArray(labelField.values.get(i))? labelField.values.get(i).join(",") : labelField.values.get(i)
      const y =    valueField.values.get(i)
      data.push({
        name, y,
        custom: { unit: setUnit === undefined? valueField.config.unit ?? null : setUnit}
      })
    }

    let seriesDef: SimpleSeries = { data, type:'pie'}
    series.push(seriesDef)
  })
  return series

}
