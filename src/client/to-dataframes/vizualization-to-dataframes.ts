import { VisualizationDocument } from '../queries/queries'
import { MutableDataFrame, FieldType, FieldDTO, Field } from '@grafana/data';

import {ResultOf} from '@graphql-typed-document-node/core'
import { GpeQuery } from '../../types';
import { valueToField } from './utils/item-fields';

type ChartResponse = ResultOf<typeof VisualizationDocument>['chart']

export const visualizationToDataFrame = (chart: ChartResponse, target: Partial<GpeQuery>): MutableDataFrame<any>[]  => {
  if (chart === null || chart === undefined) {
    return []
  }

  const frames: MutableDataFrame<any>[] = []
  const fields: FieldDTO<any>[] = []
  chart.columns.forEach(c=> {
    if (!c) {
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

  const l = Math.max(...fields.map(f=> f.values?.length ?? 0))
  target.includedMetaData?.forEach(md=> {
    switch (md) {
      case 'refid': fields.push(...valueToField(target.refId, 'refid', l) ); break
      case 'custom_tag': fields.push(...valueToField(target.custom_tags?.find(f=>f), 'custom_tags', l) ); break
      case 'type': fields.push(...valueToField(null, 'type', l) ); break
      case 'tags': fields.push(...valueToField(null, 'tags', l) ); break
      case 'item_id': fields.push(...valueToField(null, 'item_id', l) ); break
    }
  })

  frames.push(new MutableDataFrame({
    name: target.refId,
    fields
  }))

  return frames
}
