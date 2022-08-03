import { makeNodeApolloClient } from './client/make-node-apollo-client';
import { ItemsWithMetricsQueryVariables, ItemsWithMetricsDocument} from './client/queries/queries'
import {metricsQuery} from './client/metrics-query'
import {DataFrame, standardTransformersRegistry, standardTransformers,transformDataFrame,DataTransformerConfig, DataTransformerInfo, TransformerRegistryItem } from '@grafana/data'

import {prepareTimeSeriesTransformer} from './transformers/prepareTimeSeries/prepareTimeSeries'
import {rowsToFieldsTransformer} from './transformers/rowsToFields/rowsToFields'

import Highcharts from 'highcharts'

export class GpeApi {
  public client: ReturnType<typeof makeNodeApolloClient>

  constructor(client: ReturnType<typeof makeNodeApolloClient>) {
    this.client = client
  }

  grafanaQuery= async (variables: ItemsWithMetricsQueryVariables) => {
    const items = (await this.client?.query({
      query: ItemsWithMetricsDocument,
      variables,
    }))?.data.items
    const frames = metricsQuery(items)

    return frames
  }


  processTransform = async (frames: DataFrame[], transformations: DataTransformerConfig[]): Promise<DataFrame[]> => {
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

  toCsv = (frames: DataFrame | DataFrame[], itemDelimiter: string = '\t', lineDelimiter:string = '\n' ):string => {
    console.log(itemDelimiter,lineDelimiter)
    let frame: DataFrame
    if (Array.isArray(frames)) {
      frame = frames[0]
      console.warn('you need to pass a single data frame, you passed several data frames to this function, ONLY GOING TO USE THE FIRST INDEX')
    } else {
      frame = frames
    }

    let csv: string = frame.fields.map(f => (f.config.displayName ?? f.name).replaceAll(',','\,')).join(itemDelimiter) + lineDelimiter
    frame.fields[0].values.toArray().forEach((_,i)=> {
      const row = frame.fields.map(f=> f.values.toArray()[i]).join(itemDelimiter) + lineDelimiter
      csv += row
    })
    return JSON.stringify(csv)
  }
  

  
  static buildSeriesFromDataFrame = (dataframes: DataFrame[]):Highcharts.SeriesOptionsType[] => {
    let series: Highcharts.SeriesOptionsType[] = []
    dataframes.forEach(frame=>{
      const time = frame.fields.find(f=>f.type=='time')?.values.toArray()
      if (time) {
        frame.fields.map(f => {
          if( f.type !== 'number') {
            return;
          }
          let data: number[][] = []
          f.values.toArray().forEach((d:number,i)=> {
            data.push([time[i],d])
          })
          let seriesDef: Highcharts.SeriesOptionsType = { type:'line', data }
          
          series.push(seriesDef)
        })
      }
    })
    return series
  }
}
