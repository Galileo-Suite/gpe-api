import { MutableDataFrame } from '@grafana/data';

const renameFiles = (arr:string[]): string[] => {
  const count:{[key:string]:number} = {};
  arr.forEach((x,i) => {

    if ( arr.indexOf(x) !== i ) {
      const c = x in count ? count[x] = count[x] + 1 : count[x] = 1;
      let j = c + 1;
      let k = x + '(' + j + ')';

      while( arr.indexOf(k) !== -1 ) k = x + '(' + (++j) + ')';
      arr[i] = k;
    }
  });
  return arr;
}

export const dedupeFrameNames = (frames: MutableDataFrame<any>[]): MutableDataFrame<any>[] => {
  const names = frames.map(f=>f.name?? "")
  const newNames = renameFiles(names)
  newNames.forEach((l,i)=> frames[i].name = l)
  return frames
}
