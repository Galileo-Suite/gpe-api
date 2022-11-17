import Highcharts from 'highcharts'
import { units } from '../utils/units'

export type SupportedHighchartsTypes = 'line' | 'pie' | 'bar' | 'custom' | 'item' | 'forecast'

export type ConversionFunctions = {
  [key in SupportedHighchartsTypes]: string
}

export type HighchartsPanelGlobalOptions = {
  timezone: string
  unit?: keyof typeof units
  outUnit?: keyof typeof units
  optimizeUnit: boolean
  yAxisTitle: string
  enabled: boolean
  useDarkTheme?: boolean
  usePanelDimensions?: boolean
  title:  string
  options3dEnabled: boolean
  alpha3d?: number
  beta3d?: number
  depth3d?: number
  tooltipFormat: string
  labelFormat: string
  legendFormat: string
}

export type HighchartLineOptions = {
  enabled: boolean,
  area: boolean,
  lineWidth: number,
  opacity: number,
  marker: boolean,
  markerRadius: number,
  shadow: boolean,
  shadowIntensity: number,
  selectedSeries?: Array<string>,
  seriesOptions?: Highcharts.Options,
  pointType: "line" | "spline" | "column"
  stacking: "unstacked" | "normal" | "percent",
  borderRadius: number,
  borderWidth: number,
  groupPadding: number,
  pointPadding: number,
}

export type HighchartsPieOptions = {
  enabled: boolean
  slicedOptions?: 'none' | 'all' | 'selected'
  slicedOffset?: number
  innerSize: number
  startAngle: number
  endAngle?: number
  multiSlice?: Array<string>
}

export type HighchartsBarOptions = {
  enabled: boolean
}

export type HighchartsForecastOptions = {

}

export type MarkerTypes = 'square' | 'triangle' | 'circle' | 'diamond'
export type TypeShapes = 'arc' | 'rectangle'

export type HighchartsItemOptions = {
  enabled: boolean
  marker: MarkerTypes
  shape: TypeShapes
  innerSize: number
  startAngle: number
  endAngle?: number
  totalCount?: number
  rows?: number
}

export type HighchartJsonOverrideOptions = {
  enabled: boolean
  hcOptions: Highcharts.Options
}

export interface HighchartsPanelOptions {
  key: string,
  highchartType: SupportedHighchartsTypes,
  globalOptions: HighchartsPanelGlobalOptions
  highchartLineOptions: HighchartLineOptions
  highchartPieOptions: HighchartsPieOptions
  highchartBarOptions: HighchartsBarOptions
  highchartItemOptions: HighchartsItemOptions
  highchartForecastOptions: HighchartsForecastOptions
  HighchartJsonOverrideOptions: HighchartJsonOverrideOptions
}

