
import { VisualizationDocument } from './queries/queries'
import { MutableDataFrame, FieldType, FieldDTO, Field } from '@grafana/data';

import {ResultOf} from '@graphql-typed-document-node/core'
import { GpeQuery } from '../types';

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
    if (c?.data && c?.data.length > 0) {
      values = c.data
      type = FieldType.number
    }

    fields.push({
      name: c?.label ?? "",
      type,
      values,
    })
  })
  frames.push(new MutableDataFrame({
    name: chart.title ?? "",
    fields
  }))

  return frames
}
