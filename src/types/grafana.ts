import { GpeQuery, GpeTarget, HighchartsPanelOptions} from './index'
import { DataTransformerConfig } from '@grafana/data'


export interface GrafanaApiConfig {
  url: string
  token: string
}

export interface GrafanaDashboard {
  panels: Panel[]
  title:string
  time: {from:string, to:string}
  timeFrom?: string
  timeShift?: string
  hideTimeOverride?: boolean
}


export interface Panel {
  targets: GpeQuery[],
  transformations?: DataTransformerConfig[]
  options: HighchartsPanelOptions
  [key:string]: any
}
