import Highcharts from 'highcharts'

export type SupportedHighchartsTypes = 'line' | 'pie' | 'custom'
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
  enabled: Boolean
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

export const customCode = `
let series = []
data.forEach(frame=>{
  const time = frame.fields.find(f=>f.type=='time')?.values.toArray()
  if (time) {
    frame.fields.map(f => {
      if( f.type !== 'number') {
        return;
      }
      let data = []
      f.values.toArray().forEach((d,i)=> {
        data.push([time[i],d])
      })
      let seriesDef = { type:'line', data, name: f.config.displayName ?? \`\${frame.name} \${f.name}\`}

      series.push(seriesDef)
    })
  }
})
return {series}
`

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
