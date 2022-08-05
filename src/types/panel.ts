import Highcharts from 'highcharts'
import * as ts from "typescript"

export type SupportedHighchartsTypes = 'line' | 'pie' | 'custom'
export type HighchartOptions = {
  [key in SupportedHighchartsTypes]: Highcharts.Options
}
export type ConversionFunctions = {
  [key in SupportedHighchartsTypes]: string
}

export interface HighchartsPanelOptions {
  key: string,
  highchartsType: SupportedHighchartsTypes,
  highchartOptions: HighchartOptions
  conversionFunction: ConversionFunctions
  useDarkTheme?: boolean
  usePanelDimensions?: boolean
}

export const defaultHighchartsPieOptions:Highcharts.Options = {
  "title":{
    "text":"<title>"
  },
  "chart": {
    "options3d": {
      "enabled": true,
      "alpha": 45,
      "beta": 0
    }
  },
  "tooltip": {
    "pointFormat": "{series.name}: <b>{point.percentage:.1f}%</b>"
  },
  "plotOptions": {
    "pie": {
      "allowPointSelect": true,
      "cursor": "pointer",
      "depth": 35,
      "dataLabels": {
        "enabled": true,
        "format": "{point.name}"
      }
    }
  }
}
export const defaultHighchartsSeriesOptions:Highcharts.Options = {
  "title": {
    "text": "title"
  },
  "subtitle": {
    "text": "<h1>sub title</h1>"
  },
  "yAxis": {
    "title": {
      "text": ""
    }
  },
  "xAxis": {
    "type": "datetime",
    "accessibility": {
      "rangeDescription": "Range: 2010 to 2017"
    }
  },
  "legend": {
    "layout": "horizontal",
    "align": "left",
    "verticalAlign": "bottom"
  },
  "plotOptions": {
    "series": {
      "marker": {
        "enabled": false
      }
    }
  }
}

export const defaultHighchartsPanelOptions: HighchartsPanelOptions = {
  key: '',
  highchartsType: 'line',
  highchartOptions: {
    pie: defaultHighchartsPieOptions,
    line: defaultHighchartsSeriesOptions,
    custom: {},
  },
  conversionFunction: {
    // pie: highchartsPieFromDataFrame.toString(),
    // line: highchartsLineFromDataFrame.toString(),
    pie: '',
    line: '',
    custom: ``,
  },
  useDarkTheme: false,
  usePanelDimensions: false,
};