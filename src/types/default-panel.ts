import { HighchartsPanelOptions } from './panel';

export const defaultHighchartsPanelOptions: HighchartsPanelOptions = {
  key: '',
  highchartType: 'line',
  globalOptions: {
    timezone: 'America/New_York',
    optimizeUnit: true,
    yAxisTitle: 'title {unit}',
    title: "",
    enabled: true,
    useDarkTheme: false,
    usePanelDimensions: true,
    tooltipFormat:'{point.name}: {point.custom.pretty}',
    labelFormat:'{point.name}: {point.custom.pretty}',
    legendFormat:'{point.name}',
    options3dEnabled: false,
    alpha3d: 45,
    beta3d: 0,
    depth3d: 35,
  },
  highchartPieOptions: {
    enabled:true,
    slicedOptions: 'none',
    slicedOffset: 10,

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
  highchartItemOptions: {
    enabled: true,
    innerSize: 40,
    startAngle: -90,
    endAngle: 90,
    marker: 'square',
    shape: 'rectangle',
    totalCount: 100,
    rows: 10
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
