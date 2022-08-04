import { makeNodeApolloClient } from './client/make-node-apollo-client';
import { ItemsWithMetricsQueryVariables, ItemsWithMetricsDocument} from './client/queries/queries'
import { metricsQuery } from './client/metrics-query'
import { DataTransformerConfig, TimeRange,ScopedVars } from '@grafana/data'

import { GpeTarget } from './types';
import { buildItemWithMetricsVars, HighchartsPanelOptions,executeTransforms, highchartObjectFromDataPanelOptions } from './utils';

export class GpeApi {
  public client: ReturnType<typeof makeNodeApolloClient>

  constructor(client: ReturnType<typeof makeNodeApolloClient>) {
    this.client = client
  }

  grafanaQuery = async (variables: ItemsWithMetricsQueryVariables) => {
    const items = (await this.client.query({
      query: ItemsWithMetricsDocument,
      variables,
    }))?.data.items
    const frames = metricsQuery(items)

    return frames
  }
  
  mockGrafana = async (targets: GpeTarget[], transformations: DataTransformerConfig[], panelOptions: HighchartsPanelOptions, range?: TimeRange, scopedVars: ScopedVars = {} ) => {
    const Mutableframes = (await Promise.all(
      targets.map(async (target) => {

        const variables = buildItemWithMetricsVars(target, range, scopedVars);
        const items = (await this.client.query({
          query: ItemsWithMetricsDocument,
          variables,
        }))?.data.items
        const frames = metricsQuery(items)

        return frames;
      })
    )).flat()
    
    const frames = await executeTransforms(Mutableframes, transformations)
    
    const hcOptions = highchartObjectFromDataPanelOptions(frames, panelOptions)
    
    return hcOptions
  }
}
