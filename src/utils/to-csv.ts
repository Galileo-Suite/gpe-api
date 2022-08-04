import { DataFrame } from '@grafana/data'

export const toCsv = (frames: DataFrame | DataFrame[], itemDelimiter: string = '\t', lineDelimiter:string = '\n' ):string => {
  console.log(itemDelimiter,lineDelimiter)
  let frame: DataFrame
  if (Array.isArray(frames)) {
    frame = frames[0]
    console.warn('you need to pass a single data frame, you passed several data frames to this function, ONLY GOING TO USE THE FIRST INDEX')
  } else {
    frame = frames
  }

  let csv: string = frame.fields.map(f => (f.config.displayName ?? f.name).replaceAll(',','\,')).join(itemDelimiter) + lineDelimiter
  frame.fields[0].values.toArray().forEach((_,i)=> {
    const row = frame.fields.map(f=> f.values.toArray()[i]).join(itemDelimiter) + lineDelimiter
    csv += row
  })
  return JSON.stringify(csv)
}