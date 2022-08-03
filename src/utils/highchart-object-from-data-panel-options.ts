import { DataFrame } from '@grafana/data'
import merge from 'lodash.merge'
import defaults from 'lodash.defaults'
import { highchartsPieFromDataFrame } from './highcharts-pie-from-dataframe'
import {darkHighchartsTheme} from './dark-highcharts-theme'
import Highcharts from 'highcharts'

export interface HighchartsPanelOptions {
  highchartOptions: Highcharts.Options
  useDarkTheme?: boolean
  usePanelDimensions?: boolean
}

const defaultJsonOptions:Highcharts.Options = {
  "title":{
    "text":"<title>"
  },
  "chart": {
    "type": "pie",
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


export const defaultHighchartsPanelOptions: HighchartsPanelOptions = {
  highchartOptions: defaultJsonOptions,
  useDarkTheme: false,
  usePanelDimensions: false,
};

export const highchartObjectFromDataPanelOptions = (data: DataFrame[], options: HighchartsPanelOptions) => {
  options = defaults(options, defaultHighchartsPanelOptions)
  const hcOptions:Highcharts.Options = {
    series: highchartsPieFromDataFrame(data)
  }
  merge(hcOptions, options.highchartOptions)
  
  if (options.useDarkTheme) {
    merge(hcOptions, darkHighchartsTheme, {chart:{backgroundColor:'transparent'}})
  } 
  
  return hcOptions 
}