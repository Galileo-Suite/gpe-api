import { HighchartsPanelOptions } from '../../types'
import {DataFrame } from '@grafana/data'
import Highcharts, { SeriesPieOptions } from 'highcharts'
import { pieFromDataFrame } from '../pie/pie-from-dataframe';

export const itemFromPanelOptions = (highchartItemOptions: HighchartsPanelOptions['highchartItemOptions'], dataframes: DataFrame[]): Highcharts.Options => {
  if (highchartItemOptions.enabled === false) {
    return {series: pieFromDataFrame(dataframes) as SeriesPieOptions[]};
  }
  const hcOptions: Highcharts.Options = {
    chart:{
      type:'item',
    },
    plotOptions:{
      item: {
        rows: highchartItemOptions.rows,
        marker: {
          symbol: highchartItemOptions.marker
        }
      },
    }
  }


  if (!(hcOptions.plotOptions?.item)) {
    return hcOptions
  }



  if (highchartItemOptions.shape === 'arc') {
    const pieOptions = {
     ...hcOptions.plotOptions.pie,
     innerSize: `${highchartItemOptions.innerSize}%`,
     startAngle: highchartItemOptions.startAngle,
     endAngle: highchartItemOptions.endAngle,
     rows: undefined,
   }
   hcOptions.plotOptions.item = {...hcOptions.plotOptions.item, ...pieOptions}
  }

  //code to calulate totals give a total count, converts series to percent ints
  const series = pieFromDataFrame(dataframes)
  series.forEach(s=> s.data = s.data.sort((a,b) => (a.y??0) - (b.y??0)) ) //sort each series so they show nicely and for the remainder algo
  let {totalCount} = highchartItemOptions
  series.forEach(s=>{
    const sum = s.data.map(d=>d.y ?? 0).reduce((a, b) => a + b, 0)
    if (sum === 0 ) {return;}
    if (sum > 10000 ) { totalCount = totalCount ?? 10000 } // set the max items
    if (totalCount === undefined) { return; }

    let total = 0
    s.data.forEach(d => {
      if (totalCount === undefined) { return } //need this for type error not sure why
      d.y = Math.floor(((d.y ?? 0)/sum)*totalCount)
      total += d.y
    })
    let delta = totalCount - total
    let i = 0
    while (delta > 0) {
      let x = s.data[i].y ?? 0
      x += 1
      s.data[i].y = x
      delta -= 1
      i++
    }
  })

  hcOptions.series = series as SeriesPieOptions[]

  return hcOptions
}
