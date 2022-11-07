import { humanize } from '../../utils/humanize'
import {DataFrame, FieldType, getFieldDisplayName } from '@grafana/data'
import Highcharts from 'highcharts'


interface data extends Highcharts.PointOptionsObject {
  name:string
}
interface simplePieSeriesOption {
  data: data[]
}

export const pieFromDataFrame = (dataframes: DataFrame[]): simplePieSeriesOption[] => {
  let series:  simplePieSeriesOption[] = []

  //case when pie is streched across dataframe
  const allfieldsLengths = dataframes.map(d=>d.fields.map(f=>f.values.toArray().length)).flat()

  if (Math.max(...allfieldsLengths) === 1) {
    dataframes.forEach(frame=>{
      const data = frame.fields.map(f=> {
        const y:number = f.values.toArray()[0]
        const name = getFieldDisplayName(f,frame, dataframes)
        let custom:any = {pretty: y, prettyValue: y, name}
        return {name, y, custom}
      } )
      let seriesDef:  simplePieSeriesOption = { data }
      series.push(seriesDef)
    })
    return series
  }

  dataframes.forEach(frame=>{
    const data: data[] = []
    const labelField = frame.fields.find(f=> f.type === FieldType.string ||  Array.isArray(f.values.get(0)) )
    const valueField = frame.fields.find(f=> f.type === FieldType.number &&  !Array.isArray(f.values.get(0)))
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
      let custom:any = {pretty: y, prettyValue: y}
      if (valueField.config.unit == "bytes") {
        const pretty = humanize(y, false, 2)
        const [prettyValue, unit] = pretty.split(' ')
        custom = {pretty, unit, prettyValue, name}
      }
      data.push({ name, y, custom })
    }

    let seriesDef: simplePieSeriesOption = { data }
    series.push(seriesDef)
  })
  return series

}
