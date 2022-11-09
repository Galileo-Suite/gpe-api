
// must assign unit on a per point basis, is a little repetative for line, but useful in pie. so I decicded to go
// with the most fine grained control
export type pointCustom = {unit: string | null}
export type HighchartsDataPoint =  (Highcharts.PointOptionsObject & {name:string, custom: pointCustom, y: number | null})
export type SimpleSeries = Omit<Highcharts.SeriesOptions, 'data'> & {
  data: HighchartsDataPoint[]
}


export type HighchartsOptions = Omit<Highcharts.Options, 'series'> & {
  series?: SimpleSeries[]
}
