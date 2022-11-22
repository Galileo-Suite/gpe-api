import { HighchartsOptions, isPointObjectData, isTupleData } from '../types'
import { units } from './units'


type getValueAndUnitReturn = {
  value: number
  unit: keyof typeof units
}
export const getValueAndUnit = (bytes: number,tenOrtwo: 10 | 2 = 2):getValueAndUnitReturn  => {
    const bytesBase10 = (bytes:number):getValueAndUnitReturn => {
        if (bytes === 0) return {value:0, unit: 'B'};
        const s = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        let e = Math.floor(Math.log(bytes)/Math.log(1000));
        const value = parseFloat((bytes/Math.pow(1000, Math.floor(e))).toFixed(5))
        e = (e<0) ? (-e) : e;
        return {value, unit: s[e] as keyof typeof units}
    }
    const bytesBase2 = (bytes:number):getValueAndUnitReturn => {
      if (bytes === 0) return {value:0, unit: 'iB'};
        const s = ['iB','KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
        let e = Math.floor(Math.log(bytes)/Math.log(1024));
        const value = parseFloat((bytes/Math.pow(1024, Math.floor(e))).toFixed(5))
        e = (e<0) ? (-e) : e;
        return {value, unit: s[e] as keyof typeof units}
    }

    if (tenOrtwo === 10) {
        return bytesBase10(bytes)
    }
    return bytesBase2(bytes)
}

export const findBestUnit = (hcOptions: HighchartsOptions, unit: keyof typeof units) => {
  let max = 0
  hcOptions.series?.forEach(s=> {
    if (isPointObjectData(s.data)) {
      s.data.forEach(d=> {
        const num = convertToBase(d.y ?? null, d.custom.unit as keyof typeof units)
        if (num !== null && num > max) { max = num }
      })
    } else if (isTupleData(s.data)){
      s.data.forEach(d=> {
        const num = convertToBase(d[1] ?? null, s.custom.unit as keyof typeof units)
        if (num !== null && num > max) { max = num }
      })
    }
  })
  return getValueAndUnit(max,unit.includes('i')? 2 : 10).unit
}


/**
* modifies highchart object in place
*/
export const optmizeHcOptions = (hcOptions: HighchartsOptions, outUnit: keyof typeof units) => {
  hcOptions.series?.forEach(s=> {
    if (isPointObjectData(s.data)) {
      s.data.forEach(d=>{
        if (d.custom.unit === null) {return;}
        const base = convertToBase(d.y,  d.custom.unit as keyof typeof units)
        if (base === null) {return;}
        const factor = units[outUnit]
        if ( factor === null) {return;}
        d.y = base / factor
      })
    } else if (isTupleData(s.data)){
      s.data.forEach(d=>{
        if (s.custom.unit === null) {return;}
        const base = convertToBase(d[1],  s.custom.unit as keyof typeof units)
        if (base === null) {return;}
        const factor = units[outUnit]
        if ( factor === null) {return;}
        d[1] = base / factor
      })
    }
  })
  return hcOptions
}

export const convertToBase = (num: number | null , unit: keyof typeof units): number | null => {
  if (num === undefined || num === null) {
    return num
  }
  const factor =  units[unit]
  if (factor) {
    return num * factor
  }
  return num
}

