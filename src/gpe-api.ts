import { makeNodeApolloClient } from './client/make-node-apollo-client';
import { ItemsWithMetricsDocument, VisualizationDocument, TransientsDocument} from './client/queries/queries'
import { DataTransformerConfig, ScopedVars, dateTimeParse, MutableDataFrame,TimeRange, getDefaultTimeRange } from '@grafana/data'
import { GpeQuery,GrafanaDashboard, Panel } from './types';

import { buildItemWithMetricsVars } from './client/build-query-vars/build-item-with-metric-vars';
import { templateTarget } from './utils/template-target'
import { buildTransientVars } from './client/build-query-vars/build-transient-vars';
import {buildVisualizationVars} from './client/build-query-vars/build-visualization-vars'
import { HighchartsPanelOptions } from './types';
import { executeTransforms, } from './utils/execute-transforms';
import { highchartObjectFromDataPanelOptions } from './panel-to-highchart/highchart-object-from-data-panel-options';
import { dedupeFrameNames } from './utils/dedupe-frame-names';

import { metricsToDataFrames } from './client/to-dataframes/metrics-to-dataframes'
import { transientsToDataFrames } from './client/to-dataframes/transients-to-dataframes'
import { visualizationToDataFrame}  from './client/to-dataframes/vizualization-to-dataframes'
import { applyPanelTimeOverrides, getTimeRangeOfPanelInDashboard } from './utils';

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

  mockGrafana = async (targets: GpeQuery[], transformations: DataTransformerConfig[], panelOptions: HighchartsPanelOptions, range: TimeRange, scopedVars: ScopedVars = {} ) => {
    const r = {
      epoch_start:  range.from.unix(),
      epoch_end: range.to.unix(),
    }
    const Mutableframes = (await Promise.all(
      targets.map(async (target) => {
        const frames = await this.targetsToFrames(targets, r, scopedVars)
        return frames;
      })
    )).flat()
    const frames = await executeTransforms(Mutableframes, transformations)
    const hcOptions = highchartObjectFromDataPanelOptions(frames, panelOptions)
    return {hcOptions, frames}
  }

  getPanelByKey = (key: string, dashboard: GrafanaDashboard) => {
    const panel = dashboard.panels.find(p => p.options.key == key)
    if (panel === undefined) {
      console.log(`Could not find ${key} in dashboard`)
      return null
    }
    return panel
  }

  createChartFromPanel = async (panel: Panel, time?: GrafanaDashboard['time'], scopedVars?: ScopedVars) => {
    if (time === undefined) {
      console.log('range was undefiend, please define it something like ', {from: 'now-1d', to:'now'})
      return;
    }
    const dashboardTimeRange: TimeRange = {
      from: dateTimeParse(time.from),
      to: dateTimeParse(time.to),
      raw: time
    }
    const {timeRange} = applyPanelTimeOverrides(panel, dashboardTimeRange)

    const transformations = panel.transformations ?? []
    return await this.mockGrafana(panel.targets, transformations, panel.options, timeRange, scopedVars)
  }

  grafanaChart = async (key: string, dashboard: GrafanaDashboard) => {
    const panel = dashboard.panels.find(p => p.options.key == key)
    if (panel === undefined) {
      throw new Error(`Could not find panel in dashboard ${dashboard.title}`)
    }
    const time = getTimeRangeOfPanelInDashboard(dashboard, panel)

    const scopedVars:ScopedVars = {}
    const transformations = panel.transformations ?? []
    const {hcOptions, frames} = await this.mockGrafana(panel.targets, transformations, panel.options, time, scopedVars)
    return {hcOptions, frames}
  }
}
