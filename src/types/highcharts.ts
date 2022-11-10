
// must assign unit on a per point basis, is a little repetative for line, but useful in pie. so I decicded to go
// with the most fine grained control
export type pointCustom = {unit: string | null}
export type HighchartsObjectPoint = (Highcharts.PointOptionsObject & {name:string, custom: pointCustom, y: number | null})
export type HighchartsTuplePoint = [number,number]
export type HighchartsDataPoint = HighchartsTuplePoint  | HighchartsObjectPoint
export type SimpleSeries = Omit<Highcharts.SeriesOptions, 'data'> & {
  data: HighchartsDataPoint[]
  custom: pointCustom
}


export type HighchartsOptions = Omit<Highcharts.Options, 'series'> & {
  series?: SimpleSeries[]
}

export const isPointObjectData = (test: HighchartsDataPoint[]): test is HighchartsObjectPoint[] => {
  if (test.length === 0 ) return false
  return !Array.isArray(test);
}
export const isTupleData = (test: HighchartsDataPoint[]): test is HighchartsTuplePoint[] => {
  if (test.length === 0 ) return false
  return Array.isArray(test);
}
