import { makeNodeApolloClient } from './client/make-node-apollo-client';
import { ItemsWithMetricsDocument, VisualizationDocument, TransientsDocument} from './client/queries/queries'
import { DataTransformerConfig, ScopedVars, dateTimeParse, MutableDataFrame } from '@grafana/data'
import { GpeQuery,GrafanaDashboard, Panel } from './types';

import { buildItemWithMetricsVars, templateTarget } from './utils/build-item-with-metric-vars';
import { buildTransientVars } from './utils/build-transient-vars';
import {buildVisualizationVars} from './utils/build-visualization-vars'
import { HighchartsPanelOptions } from './types';
import { executeTransforms, } from './utils/execute-transforms';
import { highchartObjectFromDataPanelOptions } from './utils/highchart-object-from-data-panel-options';
import { dedupeFrameNames } from './utils/dedupe-frame-names';

import { metricsToDataFrames } from './client/to-dataframes/metrics-to-dataframes'
import { transientsToDataFrames } from './client/to-dataframes/transients-to-dataframes'
import { visualizationToDataFrame}  from './client/to-dataframes/vizualization-to-dataframes'

type GpeRange = {
  epoch_start: number
  epoch_end: number
}

export class GpeApi {
  public client: ReturnType<typeof makeNodeApolloClient>

  constructor(client: ReturnType<typeof makeNodeApolloClient> ) {
    this.client = client
  }

  grafanaQuery = async (target: Partial<GpeQuery>, range: GpeRange): Promise<MutableDataFrame<any>[]> => {
    let frames: MutableDataFrame<any>[] = []

    if (target.request_type === 'metrics') {
      const variables = buildItemWithMetricsVars(target, range)
      const items = (await this.client.query({
        query: ItemsWithMetricsDocument,
        variables,
      }))?.data.items
      frames = metricsToDataFrames(items, target)

    }  else if ( target.request_type === 'transient' ) {
      const variables = buildTransientVars(target, range)
      const items = (await this.client.query({
        query: TransientsDocument,
        variables,
      })).data.items
      frames = transientsToDataFrames(items, target)

    } else if ( target.request_type === 'visualization' ) {
      const variables = buildVisualizationVars(target, range)
      const chart = (await this.client.query({
        query: VisualizationDocument,
        variables,
      }))?.data.chart

      frames = visualizationToDataFrame(chart, target)
    }
    return frames
  }

  targetsToFrames = async (targets: GpeQuery[], range: GpeRange, scopedVars: ScopedVars = {}): Promise<MutableDataFrame<any>[]> => {
    const frames  = (await Promise.all(
      targets.map(async (target) => {

        const templatedTarget = templateTarget(target, scopedVars)
        const frames = this.grafanaQuery(templatedTarget, range)

        return frames;
      })
    )).flat()

    return dedupeFrameNames(frames)
  }

  mockGrafana = async (targets: GpeQuery[], transformations: DataTransformerConfig[], panelOptions: HighchartsPanelOptions, range: GrafanaDashboard['time'], scopedVars: ScopedVars = {} ) => {
    const r = {
      epoch_start: Math.round(dateTimeParse(range.from).toDate().getTime()/1000),
      epoch_end: Math.round(dateTimeParse(range.to).toDate().getTime()/1000)
    }
    const Mutableframes = (await Promise.all(
      targets.map(async (target) => {
        const frames = await this.targetsToFrames(targets, r, scopedVars)
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
