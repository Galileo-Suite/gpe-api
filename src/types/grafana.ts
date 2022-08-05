import { GpeTarget, HighchartsPanelOptions} from './index'
import { DataTransformerConfig } from '@grafana/data'


export interface GrafanaApiConfig {
  url: string
  token: string
}

export interface GrafanaDashboard {
  panels: Panel[]
  title:string
  time: {from:string, to:string}
}


export interface Panel { 
  targets: GpeTarget[],
  transformations: DataTransformerConfig[]
  options: HighchartsPanelOptions
  [key:string]: any
}
