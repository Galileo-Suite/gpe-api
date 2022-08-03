import { TimeRange } from '@grafana/data';

export const unwrapOptionalTimeRange = (range?: TimeRange) => {
  if (range === undefined) {
    return {
      epoch_start: Math.floor(Date.now() / 1000 - 24 * 60 * 60),
      epoch_end: Math.floor(Date.now() / 1000),
    };
  } else {
    return {
      epoch_start: Math.floor(range.from.valueOf() / 1000),
      epoch_end: Math.floor(range.to.valueOf() / 1000),
    };
  }
};
