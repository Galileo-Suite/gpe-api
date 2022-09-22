import { makeNodeApolloClient } from './client/make-node-apollo-client';
import { ItemsWithMetricsQueryVariables, ItemsWithMetricsDocument} from './client/queries/queries'
import { metricsQuery } from './client/metrics-query'
import { DataTransformerConfig, ScopedVars, dateTimeParse, MutableDataFrame} from '@grafana/data'

import { GpeQuery, GpeTarget,GrafanaDashboard, Panel } from './types';
import { buildItemWithMetricsVars } from './utils/build-item-with-metric-vars';
import { HighchartsPanelOptions } from './types';
import { executeTransforms, } from './utils/execute-transforms';
import { highchartObjectFromDataPanelOptions } from './utils/highchart-object-from-data-panel-options';


export class GpeApi {
  public client: ReturnType<typeof makeNodeApolloClient>

  constructor(client: ReturnType<typeof makeNodeApolloClient> ) {
    this.client = client
  }

  grafanaQuery = async (target: Partial<GpeQuery>, range: Range): Promise<MutableDataFrame<any>[]> => {
    let frames: MutableDataFrame<any>[] = []
    if (target.request_type === 'metrics' || target.request_type === 'transient') {
      const variables = buildItemWithMetricsVars(target, range)
      const items = (await this.client.query({
        query: ItemsWithMetricsDocument,
        variables,
      }))?.data.items
      frames = metricsQuery(items, target)
    }
    return frames
  }

  mockGrafana = async (targets: GpeTarget[], transformations: DataTransformerConfig[], panelOptions: HighchartsPanelOptions, range: GrafanaDashboard['time'], scopedVars: ScopedVars = {} ) => {
    const Mutableframes = (await Promise.all(
      targets.map(async (target) => {
        const r = {
          epoch_start: Math.round(dateTimeParse(range.from).toDate().getTime()/1000),
          epoch_end: Math.round(dateTimeParse(range.to).toDate().getTime()/1000)
        }

        const variables = buildItemWithMetricsVars(target, r, scopedVars);
        const items = (await this.client.query({
          query: ItemsWithMetricsDocument,
          variables,
        }))?.data.items
        const frames = metricsQuery(items, target)

        return frames;
      })
    )).flat()

    const frames = await executeTransforms(Mutableframes, transformations)

    const hcOptions = highchartObjectFromDataPanelOptions(frames, panelOptions)

    return hcOptions
  }

  getPanelByKey = (key: string, dashboard: GrafanaDashboard) => {
    const panel = dashboard.panels.find(p => p.options.key == key)
    if (panel === undefined) {
      console.log(`Could not find ${key} in dashboard`)
      return null
    }
    return panel
  }

  createChartFromPanel = async (panel: Panel, range?: GrafanaDashboard['time'], scopedVars?: ScopedVars) => {
    if (range === undefined) {
      console.log('range was undefiend, please define it something like ', {from: 'now-1d', to:'now'})
      return;
    }

    return await this.mockGrafana(panel.targets, panel.transformations, panel.options, range, scopedVars)
  }

  grafanaChart = async (key: string, dashboard: GrafanaDashboard) => {
    const panel = dashboard.panels.find(p => p.options.key == key)

    if (panel === undefined) {
      throw new Error(`Could not find panel in dashboard ${dashboard.title}`)
    }
    const scopedVars:ScopedVars = {}
    return await this.mockGrafana(panel.targets, panel.transformations, panel.options, dashboard.time, scopedVars)
  }
}
