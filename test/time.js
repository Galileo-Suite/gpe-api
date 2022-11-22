const {GpeApi, makeNodeApolloClient} = require('../dist')
const req = {
  grafanaData: {
    "annotations": {
      "list": [
        {
          "builtIn": 1,
          "datasource": {
            "type": "grafana",
            "uid": "-- Grafana --"
          },
          "enable": true,
          "hide": true,
          "iconColor": "rgba(0, 211, 255, 1)",
          "name": "Annotations & Alerts",
          "target": {
            "limit": 100,
            "matchAny": false,
            "tags": [],
            "type": "dashboard"
          },
          "type": "dashboard"
        }
      ]
    },
    "editable": true,
    "fiscalYearStartMonth": 0,
    "graphTooltip": 0,
    "id": 84,
    "links": [],
    "liveNow": false,
    "panels": [
      {
        "datasource": {
          "type": "galileo-suite-datasource",
          "uid": "PWLpcPI4z"
        },
        "gridPos": {
          "h": 8,
          "w": 12,
          "x": 0,
          "y": 0
        },
        "hideTimeOverride": false,
        "id": 1,
        "options": {
          "HighchartJsonOverrideOptions": {
            "enabled": true,
            "hcOptions": {
              "chart": {},
              "plotOptions": {
                "series": {}
              },
              "series": [],
              "title": {
                "text": "CPU Consumed"
              },
              "yAxis": [
                {
                  "title": {
                    "text": "Cores"
                  }
                }
              ]
            }
          },
          "globalOptions": {
            "alpha3d": 45,
            "beta3d": 0,
            "depth3d": 35,
            "labelFormat": "{point.name}: {point.custom.pretty}",
            "usePanelDimensions": true,
            "yAxisTitle": "title {unit}"
          },
          "highchartBarOptions": {
            "enabled": true
          },
          "highchartItemOptions": {
            "endAngle": 90,
            "innerSize": 40,
            "marker": "square",
            "shape": "rectangle",
            "startAngle": -90
          },
          "highchartLineOptions": {
            "area": false,
            "borderRadius": 0,
            "borderWidth": 1,
            "groupPadding": 0.2,
            "lineWidth": 2,
            "marker": false,
            "markerRadius": 2,
            "opacity": 0.75,
            "pointPadding": 0.1,
            "pointType": "line",
            "shadow": false,
            "shadowIntensity": 0
          },
          "highchartPieOptions": {
            "endAngle": 360,
            "innerSize": 0,
            "slicedOffset": 10,
            "slicedOptions": "none",
            "startAngle": 0
          },
          "highchartType": "line",
          "key": "dc_phys_cpu_24h"
        },
        "pluginVersion": "9.1.5",
        "targets": [
          {
            "configs": [],
            "custom_tags": [
              "Application:Domain Controllers"
            ],
            "datasource": {
              "type": "galileo-suite-datasource",
              "uid": "PWLpcPI4z"
            },
            "filters": "",
            "formulas": [
              {
                "formula": "CpuPhysicalUsed"
              }
            ],
            "function": "AVG",
            "item_ids": [],
            "item_regex": "",
            "key": "Q-ee6498f6-ed08-4dbb-bb33-557d09fcbe46-0",
            "refId": "A",
            "related_to_custom_tags": [],
            "related_to_item_ids": [],
            "related_to_item_regex": "",
            "related_to_tags": [],
            "related_to_types": [],
            "request_type": "visualization",
            "summary": 300,
            "tags": [],
            "transient_fields": [],
            "transient_type": "",
            "transient_where": "",
            "types": [
              "host"
            ],
            "use_related_to": false,
            "variable": "item_ids",
            "vis_id": [
              "HostCpuConsumed"
            ]
          }
        ],
        "transformations": [],
        "type": "grafana-highcharts-panel"
      },
      {
        "datasource": {
          "type": "galileo-suite-datasource",
          "uid": "PWLpcPI4z"
        },
        "gridPos": {
          "h": 8,
          "w": 12,
          "x": 12,
          "y": 0
        },
        "id": 6,
        "options": {
          "HighchartJsonOverrideOptions": {
            "enabled": true,
            "hcOptions": {
              "chart": {},
              "plotOptions": {
                "series": {}
              },
              "series": [],
              "title": {
                "text": "Network - Send"
              },
              "yAxis": [
                {
                  "title": {
                    "text": "MB"
                  }
                }
              ]
            }
          },
          "globalOptions": {
            "alpha3d": 45,
            "beta3d": 0,
            "depth3d": 35,
            "labelFormat": "{point.name}: {point.custom.pretty}",
            "usePanelDimensions": true,
            "yAxisTitle": "title {unit}"
          },
          "highchartBarOptions": {
            "enabled": true
          },
          "highchartItemOptions": {
            "endAngle": 90,
            "innerSize": 40,
            "marker": "square",
            "shape": "rectangle",
            "startAngle": -90
          },
          "highchartLineOptions": {
            "area": false,
            "borderRadius": 0,
            "borderWidth": 1,
            "groupPadding": 0.2,
            "lineWidth": 2,
            "marker": false,
            "markerRadius": 2,
            "opacity": 0.75,
            "pointPadding": 0.1,
            "pointType": "line",
            "shadow": false,
            "shadowIntensity": 0
          },
          "highchartPieOptions": {
            "endAngle": 360,
            "innerSize": 0,
            "slicedOffset": 10,
            "slicedOptions": "none",
            "startAngle": 0
          },
          "highchartType": "line",
          "key": "dc_net_send_24h"
        },
        "targets": [
          {
            "configs": [],
            "custom_tags": [
              "Application:Domain Controllers"
            ],
            "datasource": {
              "type": "galileo-suite-datasource",
              "uid": "PWLpcPI4z"
            },
            "filters": "m_Send",
            "formulas": [
              {
                "formula": "NetReadWriteAllEn"
              }
            ],
            "function": "AVG",
            "item_ids": [],
            "item_regex": "",
            "refId": "A",
            "related_to_custom_tags": [],
            "related_to_item_ids": [],
            "related_to_item_regex": "",
            "related_to_tags": [],
            "related_to_types": [],
            "request_type": "visualization",
            "summary": 3600,
            "tags": [],
            "transient_fields": [],
            "transient_type": "",
            "transient_where": "",
            "types": [
              "host"
            ],
            "use_related_to": false,
            "variable": "item_ids",
            "vis_id": [
              "HostNetReadWriteSummary"
            ]
          }
        ],
        "type": "grafana-highcharts-panel"
      },
      {
        "datasource": {
          "type": "galileo-suite-datasource",
          "uid": "PWLpcPI4z"
        },
        "gridPos": {
          "h": 8,
          "w": 12,
          "x": 0,
          "y": 8
        },
        "id": 3,
        "options": {
          "HighchartJsonOverrideOptions": {
            "enabled": true,
            "hcOptions": {
              "chart": {},
              "plotOptions": {
                "series": {}
              },
              "series": []
            }
          },
          "globalOptions": {
            "alpha3d": 45,
            "beta3d": 0,
            "depth3d": 35,
            "labelFormat": "{point.name}: {point.custom.pretty}",
            "outUnit": "GiB",
            "unit": "MiB",
            "usePanelDimensions": true,
            "yAxisTitle": "{unit}"
          },
          "highchartBarOptions": {
            "enabled": true
          },
          "highchartItemOptions": {
            "endAngle": 90,
            "innerSize": 40,
            "marker": "square",
            "shape": "rectangle",
            "startAngle": -90
          },
          "highchartLineOptions": {
            "area": false,
            "borderRadius": 0,
            "borderWidth": 1,
            "groupPadding": 0.2,
            "lineWidth": 2,
            "marker": false,
            "markerRadius": 2,
            "opacity": 0.75,
            "pointPadding": 0.1,
            "pointType": "line",
            "shadow": false,
            "shadowIntensity": 0
          },
          "highchartPieOptions": {
            "endAngle": 360,
            "innerSize": 0,
            "slicedOffset": 10,
            "slicedOptions": "none",
            "startAngle": 0
          },
          "highchartType": "line",
          "key": "dc_mem_24h"
        },
        "targets": [
          {
            "configs": [],
            "custom_tags": [
              "Application:Domain Controllers"
            ],
            "datasource": {
              "type": "galileo-suite-datasource",
              "uid": "PWLpcPI4z"
            },
            "filters": "m_Used",
            "formulas": [
              {
                "formula": "MemRealUsed",
                "nameAs": " memory"
              }
            ],
            "function": "AVG",
            "item_ids": [],
            "item_regex": "",
            "refId": "A",
            "related_to_custom_tags": [],
            "related_to_item_ids": [],
            "related_to_item_regex": "",
            "related_to_tags": [],
            "related_to_types": [],
            "request_type": "metrics",
            "summary": 300,
            "tags": [
              "WINDOWS@OS"
            ],
            "transient_fields": [],
            "transient_type": "",
            "transient_where": "",
            "types": [
              "host"
            ],
            "use_related_to": false,
            "variable": "item_ids",
            "vis_id": [
              "HostRealMemory_in_tag"
            ]
          }
        ],
        "transformations": [
          {
            "id": "seriesToColumns",
            "options": {}
          },
          {
            "id": "renameByRegex",
            "options": {
              "regex": ".* (.*)_.*",
              "renamePattern": "$1"
            }
          }
        ],
        "type": "grafana-highcharts-panel"
      },
      {
        "datasource": {
          "type": "galileo-suite-datasource",
          "uid": "zlorRMn4k"
        },
        "gridPos": {
          "h": 8,
          "w": 12,
          "x": 12,
          "y": 8
        },
        "id": 10,
        "options": {
          "HighchartJsonOverrideOptions": {
            "enabled": true,
            "hcOptions": {
              "chart": {},
              "plotOptions": {
                "series": {}
              },
              "series": [],
              "title": {
                "text": "Logical Disk Read Throughput"
              }
            }
          },
          "globalOptions": {
            "alpha3d": 45,
            "beta3d": 0,
            "depth3d": 35,
            "labelFormat": "{point.name}: {point.custom.pretty}",
            "outUnit": "MiB",
            "unit": "KiB",
            "usePanelDimensions": true,
            "yAxisTitle": "{unit}"
          },
          "highchartBarOptions": {
            "enabled": true
          },
          "highchartItemOptions": {
            "endAngle": 90,
            "innerSize": 40,
            "marker": "square",
            "shape": "rectangle",
            "startAngle": -90
          },
          "highchartLineOptions": {
            "area": false,
            "borderRadius": 0,
            "borderWidth": 1,
            "groupPadding": 0.2,
            "lineWidth": 2,
            "marker": false,
            "markerRadius": 2,
            "opacity": 0.75,
            "pointPadding": 0.1,
            "pointType": "line",
            "shadow": false,
            "shadowIntensity": 0
          },
          "highchartPieOptions": {
            "endAngle": 360,
            "innerSize": 0,
            "slicedOffset": 10,
            "slicedOptions": "none",
            "startAngle": 0
          },
          "highchartType": "line",
          "key": "dc_logical_disk_read_24h"
        },
        "targets": [
          {
            "configs": [],
            "custom_tags": [],
            "datasource": {
              "type": "galileo-suite-datasource",
              "uid": "zlorRMn4k"
            },
            "filters": "m_Logical",
            "formulas": [
              {
                "formula": "max(DiskRead)"
              }
            ],
            "function": "AVG",
            "item_ids": [],
            "item_regex": "Logical",
            "refId": "A",
            "related_to_custom_tags": [
              "Application:Domain Controllers"
            ],
            "related_to_item_ids": [],
            "related_to_item_regex": "",
            "related_to_tags": [
              "WINDOWS@OS"
            ],
            "related_to_types": [
              "host"
            ],
            "request_type": "metrics",
            "summary": 3600,
            "tags": [],
            "transient_fields": [],
            "transient_type": "",
            "transient_where": "",
            "types": [
              "disk"
            ],
            "use_related_to": true,
            "variable": "item_ids",
            "vis_id": [
              "HostDiskReadSummary"
            ]
          }
        ],
        "transformations": [
          {
            "id": "renameByRegex",
            "options": {
              "regex": ".*(Logical).*",
              "renamePattern": "$1"
            }
          },
          {
            "id": "calculateField",
            "options": {
              "mode": "reduceRow",
              "reduce": {
                "include": [
                  "Logical"
                ],
                "reducer": "sum"
              }
            }
          },
          {
            "id": "filterFieldsByName",
            "options": {
              "include": {
                "names": [
                  "time",
                  "Total"
                ]
              }
            }
          }
        ],
        "type": "grafana-highcharts-panel"
      },
      {
        "datasource": {
          "type": "galileo-suite-datasource",
          "uid": "PWLpcPI4z"
        },
        "gridPos": {
          "h": 8,
          "w": 12,
          "x": 0,
          "y": 16
        },
        "id": 5,
        "options": {
          "HighchartJsonOverrideOptions": {
            "enabled": true,
            "hcOptions": {
              "chart": {},
              "plotOptions": {
                "series": {}
              },
              "series": [],
              "title": {
                "text": "Network - Receive"
              },
              "yAxis": [
                {
                  "title": {
                    "text": "MB"
                  }
                }
              ]
            }
          },
          "globalOptions": {
            "alpha3d": 45,
            "beta3d": 0,
            "depth3d": 35,
            "labelFormat": "{point.name}: {point.custom.pretty}",
            "usePanelDimensions": true,
            "yAxisTitle": "title {unit}"
          },
          "highchartBarOptions": {
            "enabled": true
          },
          "highchartItemOptions": {
            "endAngle": 90,
            "innerSize": 40,
            "marker": "square",
            "shape": "rectangle",
            "startAngle": -90
          },
          "highchartLineOptions": {
            "area": false,
            "borderRadius": 0,
            "borderWidth": 1,
            "groupPadding": 0.2,
            "lineWidth": 2,
            "marker": false,
            "markerRadius": 2,
            "opacity": 0.75,
            "pointPadding": 0.1,
            "pointType": "line",
            "shadow": false,
            "shadowIntensity": 0
          },
          "highchartPieOptions": {
            "endAngle": 360,
            "innerSize": 0,
            "slicedOffset": 10,
            "slicedOptions": "none",
            "startAngle": 0
          },
          "highchartType": "line",
          "key": "dc_net_receive_24h"
        },
        "targets": [
          {
            "configs": [],
            "custom_tags": [
              "Application:Domain Controllers"
            ],
            "datasource": {
              "type": "galileo-suite-datasource",
              "uid": "PWLpcPI4z"
            },
            "filters": "m_Receive",
            "formulas": [
              {
                "formula": "NetReadWriteAllEn"
              }
            ],
            "function": "AVG",
            "item_ids": [],
            "item_regex": "",
            "refId": "A",
            "related_to_custom_tags": [],
            "related_to_item_ids": [],
            "related_to_item_regex": "",
            "related_to_tags": [],
            "related_to_types": [],
            "request_type": "visualization",
            "summary": 3600,
            "tags": [],
            "transient_fields": [],
            "transient_type": "",
            "transient_where": "",
            "types": [
              "host"
            ],
            "use_related_to": false,
            "variable": "item_ids",
            "vis_id": [
              "HostNetReadWriteSummary"
            ]
          }
        ],
        "type": "grafana-highcharts-panel"
      },
      {
        "datasource": {
          "type": "galileo-suite-datasource",
          "uid": "PWLpcPI4z"
        },
        "gridPos": {
          "h": 8,
          "w": 12,
          "x": 12,
          "y": 16
        },
        "id": 8,
        "options": {
          "HighchartJsonOverrideOptions": {
            "enabled": true,
            "hcOptions": {
              "chart": {},
              "plotOptions": {
                "series": {}
              },
              "series": [],
              "title": {
                "text": "Logical Disk Write Throughput"
              },
              "yAxis": [
                {
                  "title": {
                    "text": "MiB"
                  }
                }
              ]
            }
          },
          "globalOptions": {
            "alpha3d": 45,
            "beta3d": 0,
            "depth3d": 35,
            "labelFormat": "{point.name}: {point.custom.pretty}",
            "outUnit": "MiB",
            "unit": "KiB",
            "usePanelDimensions": true,
            "yAxisTitle": "title {unit}"
          },
          "highchartBarOptions": {
            "enabled": true
          },
          "highchartItemOptions": {
            "endAngle": 90,
            "innerSize": 40,
            "marker": "square",
            "shape": "rectangle",
            "startAngle": -90
          },
          "highchartLineOptions": {
            "area": false,
            "borderRadius": 0,
            "borderWidth": 1,
            "groupPadding": 0.2,
            "lineWidth": 2,
            "marker": false,
            "markerRadius": 2,
            "opacity": 0.75,
            "pointPadding": 0.1,
            "pointType": "line",
            "shadow": false,
            "shadowIntensity": 0
          },
          "highchartPieOptions": {
            "endAngle": 360,
            "innerSize": 0,
            "slicedOffset": 10,
            "slicedOptions": "none",
            "startAngle": 0
          },
          "highchartType": "line",
          "key": "dc_logical_disk_write_24h"
        },
        "targets": [
          {
            "configs": [],
            "custom_tags": [],
            "datasource": {
              "type": "galileo-suite-datasource",
              "uid": "PWLpcPI4z"
            },
            "filters": "m_Logical",
            "formulas": [
              {
                "formula": "max(DiskWrite)"
              }
            ],
            "function": "MAX",
            "item_ids": [],
            "item_regex": "Logical",
            "refId": "A",
            "related_to_custom_tags": [
              "Application:Domain Controllers"
            ],
            "related_to_item_ids": [],
            "related_to_item_regex": "",
            "related_to_tags": [
              "WINDOWS@OS"
            ],
            "related_to_types": [
              "host"
            ],
            "request_type": "metrics",
            "summary": 3600,
            "tags": [],
            "transient_fields": [],
            "transient_type": "",
            "transient_where": "",
            "types": [
              "disk"
            ],
            "use_related_to": true,
            "variable": "item_ids",
            "vis_id": [
              "HostDiskWriteSummary"
            ]
          }
        ],
        "transformations": [
          {
            "id": "renameByRegex",
            "options": {
              "regex": ".*(Logical).*",
              "renamePattern": "$1"
            }
          },
          {
            "id": "calculateField",
            "options": {
              "mode": "reduceRow",
              "reduce": {
                "include": [
                  "Logical"
                ],
                "reducer": "sum"
              }
            }
          },
          {
            "id": "filterFieldsByName",
            "options": {
              "include": {
                "names": [
                  "time",
                  "Total"
                ]
              }
            }
          }
        ],
        "type": "grafana-highcharts-panel"
      }
    ],
    "refresh": false,
    "schemaVersion": 37,
    "style": "dark",
    "tags": [],
    "templating": {
      "list": []
    },
    "time": {
      "from": "now/d-1d+6h",
      "to": "now/d-1d+6h"
    },
    "timepicker": {},
    "timezone": "",
    "title": "Carhartt_Domain_Controllers",
    "uid": "dbnWpPI4z",
    "version": 9,
    "weekStart": ""
  },
  data: {
    "elements":{},
    "reportConfig": {
        "use_cache": "false",
        "serverLocation": "https://my.galileosuite.com",
        "customer": "Carhartt",
        "t": "7caffc47754b38cb139ea11877504e986a7f4811d6b40c46e7864fbfe123207a",
        "graphql": "https://my.int.galileosuite.com/Carhartt/graphql",
        "token": "eyJzZWMiOiIzNzhhZjliMGI3OWM4NWJmMDg5NjQ5ZGQ1OGU2YjFkNSIsInR5cCI6InVzZXIiLCJrZXkiOiJjZDkyZDU4YmY2MDkxOTJkYzZlNzBiZjY0Y2U4N2I2ZCJ9"
    },

    "reportDetails": {
        "customerTitle": "Domain Controllers Daily Report",
        "customerName": "Carhartt",
        "reportType": "Domain Controllers"
    },

    "smtpSettings": {
        "enabled": false,
        "to": [
        ],
        "cc": [""],
        "subject": "Galileo Domain Controllers Daily Report",
        "html": "Please find the Daily Report for Carhartt Domain Controllers.<br><br>This report is generated from an automated report engine. <b>Do not reply to this email.</b>",
        "filename": "domain_controllers_daily_grsreport.pdf"
    },


    "charts":[

        { "key": "dc_phys_cpu_24h" }
    ]
  }
}

async function beforeRender (req, res) {
    const dashboard = req.grafanaData
    const chartKeys = req.data.charts
    const reportConfig = req.data.reportConfig
    if ( chartKeys.length===0 ){
        return;
    }
    const gpe = new GpeApi(makeNodeApolloClient({
        url: reportConfig.graphql,
        token: reportConfig.token
    }))
    await Promise.all(chartKeys.map(async v => {
        const k = v.key
        const res =  await gpe.grafanaChart(k, dashboard)

        res.plotOptions.series.animation = {duration: 0}
        req.data.charts[v.key] = res
    }))
}

beforeRender(req)
