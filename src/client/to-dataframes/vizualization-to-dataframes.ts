import { VisualizationDocument } from '../queries/queries'
import { MutableDataFrame, FieldType, FieldDTO, Field } from '@grafana/data';

import {ResultOf} from '@graphql-typed-document-node/core'
import { GpeQuery } from '../../types';

type ChartResponse = ResultOf<typeof VisualizationDocument>['chart']

export const visualizationToDataFrame = (chart: ChartResponse, target: Partial<GpeQuery>): MutableDataFrame<any>[]  => {
  if (chart === null || chart === undefined) {
    return []
  }

  const frames: MutableDataFrame<any>[]  = []
  const fields: FieldDTO<any>[] = []
  chart.columns.forEach(c=> {
    if (!c?.data) {
      return;
    }
    let values: (string | number | null)[] = c.pretty_data
    let type = FieldType.string
    let unit = ""
    if (c?.data && c?.data.length > 0) {
      values = c.data
      type = FieldType.number
      unit = c.unit == "number" ? "" : c.unit ?? ""
    }
    if (c.unit === "epoch") {
      values = c.data.map(f=> f? f*1000: null)
      type = FieldType.time
    }
    //this is what grafana uses for bytes (EIC) aka 1024
    if (unit == "iB"){
      unit = 'bytes'
    }
    fields.push({
      name: `${c?.label}`,
      type,
      values,
      config: {unit}
    })
  })
  frames.push(new MutableDataFrame({
    name: chart.title ?? "",
    fields
  }))

  return frames
}
