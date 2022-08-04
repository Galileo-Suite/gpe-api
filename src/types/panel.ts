import Highcharts from 'highcharts'

export interface HighchartsPanelOptions {
  key: string,
  highchartOptions: Highcharts.Options
  useDarkTheme?: boolean
  usePanelDimensions?: boolean
}

export const defaultJsonOptions:Highcharts.Options = {
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
  key: '',
  highchartOptions: defaultJsonOptions,
  useDarkTheme: false,
  usePanelDimensions: false,
};