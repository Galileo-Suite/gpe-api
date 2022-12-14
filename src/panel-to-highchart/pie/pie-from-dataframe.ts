import {DataFrame, FieldType, getFieldDisplayName } from '@grafana/data'
import { SimpleSeries, HighchartsDataPoint, HighchartsPanelOptions,HighchartsObjectPoint } from '../../types'


export type PieSeries =  (Omit<SimpleSeries,'data'> & {data: HighchartsObjectPoint[]})

export const pieFromDataFrame = (dataframes: DataFrame[], {globalOptions}: HighchartsPanelOptions): PieSeries[] => {
  const {unit: setUnit} = globalOptions

  let series:  PieSeries[] = []

  //case when pie is streched across dataframe
  const allfieldsLengths = dataframes.map(d=>d.fields.map(f=>f.values.toArray().length)).flat()
  if (Math.max(...allfieldsLengths) === 1) {
    let unit: string | null = null
    dataframes.forEach(frame=>{
      const data: HighchartsObjectPoint[] = frame.fields.map(f=> {
        const y:number = f.values.toArray()[0]
        const name = getFieldDisplayName(f,frame, dataframes)
        unit =  setUnit === undefined? f.config.unit ?? null : setUnit
        let custom: any = {pretty: y, prettyValue: y, name, unit}
        return {name, y, custom}
      } )
      let seriesDef:  PieSeries = { data, type: 'pie', custom: {unit: setUnit === undefined? unit ?? null : setUnit} }
      series.push(seriesDef)
    })
    return series
  }

  dataframes.forEach(frame=>{
    const data: HighchartsObjectPoint[] = []
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

    let seriesDef: PieSeries = { data, type:'pie',  custom: { unit: setUnit === undefined? valueField.config.unit ?? null : setUnit}}
    series.push(seriesDef)
  })
  return series

}
