import Highcharts from 'highcharts'

export type SupportedHighchartsTypes = 'line' | 'pie' | 'bar' | 'custom'
export type HighchartOptions = {
  [key in SupportedHighchartsTypes]: Highcharts.Options
}
export type ConversionFunctions = {
  [key in SupportedHighchartsTypes]: string
}
export type HighchartsPanelGlobalOptions = {
  enabled: Boolean
  useDarkTheme?: boolean
  usePanelDimensions?: boolean
}
export type HighchartLineOptions = {
  enabled: Boolean,
  area: Boolean,
  lineWidth: number,
  opacity: number,
  marker: Boolean,
  markerRadius: number,
  shadow: Boolean,
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
  enabled: Boolean
  slicedOptions?: 'none' | 'all' | 'selected'
  slicedOffset?: number
  alpha3d?: number
  beta3d?: number
  depth3d?: number
  innerSize: number
  startAngle: number
  endAngle?: number
  multiSlice?: Array<string>
}
export type HighchartsBarOptions = {
  enabled: Boolean
}
export type HighchartJsonOverrideOptions = {
  enabled: Boolean
  hcOptions: Highcharts.Options
}

export interface HighchartsPanelOptions {
  key: string,
  highchartType: SupportedHighchartsTypes,
  globalOptions: HighchartsPanelGlobalOptions
  highchartLineOptions: HighchartLineOptions
  highchartPieOptions: HighchartsPieOptions
  highchartBarOptions: HighchartsBarOptions
  HighchartJsonOverrideOptions: HighchartJsonOverrideOptions
}

export const defaultHighchartsPanelOptions: HighchartsPanelOptions = {
  key: '',
  highchartType: 'line',
  globalOptions: {
    enabled: true,
    useDarkTheme: false,
    usePanelDimensions: false,
  },
  highchartPieOptions: {
    enabled:true,
    slicedOptions: 'none',
    slicedOffset: 10,
    alpha3d: 45,
    beta3d: 0,
    depth3d: 35,
    innerSize: 0,
    startAngle: 0,
    endAngle: undefined,
    multiSlice: []
  },
  highchartLineOptions: {
    enabled:true,
    pointType: 'line',
    lineWidth: 2,
    opacity: 0,
    area: false,
    marker: false,
    markerRadius: 2,
    shadow: false,
    selectedSeries: [],
    seriesOptions: {},
    shadowIntensity: 0,
    stacking: 'unstacked',
    borderRadius: 0,
    borderWidth: 0,
    groupPadding: 0.2,
    pointPadding: 0.1
  },
  highchartBarOptions: {
    enabled:true
  },
  HighchartJsonOverrideOptions: {
    enabled:true,
    hcOptions: {
      "chart": {},
      "plotOptions": {
        "series": {}
      },
      "series": []
    }
  }
};
