import { humanize } from '../../utils/humanize'
import {DataFrame, FieldType, getFieldDisplayName } from '@grafana/data'
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

  //case when pie is streched across dataframe
  const allfieldsLengths = dataframes.map(d=>d.fields.map(f=>f.values.toArray().length)).flat()

  if (Math.max(...allfieldsLengths) === 1) {
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

  dataframes.forEach(frame=>{
    const data: data[] = []
    const labelField = frame.fields.find(f=> f.type === FieldType.string)
    const valueField = frame.fields.find(f=> f.type === FieldType.number)
    if (labelField === undefined ) {
      throw new Error('Could not find label field')
    }
    if (valueField === undefined ) {
      throw new Error('Could not find value field')
    }
    for (let i = 0; i < labelField.values.length; i++) {
      const name = labelField.values.get(i)
      const y =    valueField.values.get(i)
      let custom = {}

      if (valueField.config.unit == "bytes") {
        const pretty = humanize(y, false, 2)
        const [unit, prettyValue] = pretty.split(' ')
        custom = {pretty, unit, prettyValue}
      }
      data.push({ name, y, custom })
    }

    let seriesDef: simplePieSeriesOption = { type:'pie',  data }
    series.push(seriesDef)
  })

  return series

}
