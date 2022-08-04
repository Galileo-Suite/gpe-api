import axios, { Axios } from 'axios';
import https from 'https'
import { GrafanaApiConfig, GrafanaDashboard } from './types'

export class GrafanaApi {
  public axios: Axios
  public config: GrafanaApiConfig

  constructor(config:GrafanaApiConfig) {
    this.config = config
    this.axios = axios.create({
      headers:{
        'Authorization': `Bearer ${config.token}`
      },
      httpsAgent: new https.Agent({  
        rejectUnauthorized: false
      })
    })
  }
  
  getDashboard = async (dashboardUid:string) => {
    const res  = await this.axios.get(`${this.config.url}/api/dashboards/uid/${dashboardUid}`)
    return res.data.dashboard as GrafanaDashboard
  }
  
}
