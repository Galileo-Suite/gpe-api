import {DataFrame, standardTransformersRegistry, standardTransformers,transformDataFrame,DataTransformerConfig, DataTransformerInfo, TransformerRegistryItem, MutableDataFrame } from '@grafana/data'

import {prepareTimeSeriesTransformer} from '../transformers/prepareTimeSeries/prepareTimeSeries'
import {rowsToFieldsTransformer} from '../transformers/rowsToFields/rowsToFields'


export const executeTransforms = async (frames: MutableDataFrame[], transformations: DataTransformerConfig[]): Promise<DataFrame[]> => {
  const toRegistryItem = (t: DataTransformerInfo<any>): TransformerRegistryItem<any> => {
    return {
      id: t.id,
      name: t.name,
      transformation: t,
      description: t.description,
      editor: () => null,
    };
  }

  //@ts-ignore
  if (!standardTransformersRegistry.initialized) {
    standardTransformersRegistry.setInit(() => {
      const registryTransformerInits = Object.values(standardTransformers).map((t) => toRegistryItem(t) );
      return [
        ...registryTransformerInits,
        toRegistryItem(prepareTimeSeriesTransformer),
        toRegistryItem(rowsToFieldsTransformer)
      ]
    })
    standardTransformersRegistry.list()
  }

  const ret = await transformDataFrame(transformations, frames).toPromise()
  return ret ?? []
}
