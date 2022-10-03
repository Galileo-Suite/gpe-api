import { map } from 'rxjs/operators';

import { ArrayVector } from '@grafana/data';
import { DataFrame } from '@grafana/data/types';
import { DataTransformerInfo } from '@grafana/data/types/transformations';

export interface BucketTime {
  field: string;
}

export interface BucketByTransformerOptions {
  bucket: BucketTime[];
}

export const BucketByTransformer: DataTransformerInfo<BucketByTransformerOptions> = {
  id: "bucketTime",
  name: 'Bucket Time',
  description: 'Bucket a time field to start of',
  defaultOptions: {
    fields: {},
  },

  /**
   * Return a modified copy of the series.  If the transform is not or should not
   * be applied, just return the input series
   */
  operator: (options) => (source) =>
    source.pipe(
      map((data) => {
        if (!Array.isArray(data) || data.length === 0 || !options?.bucket?.length) {
          return data;
        }
        return sortDataFrames(data, options.bucket);
      })
    ),
};

export function sortDataFrames(data: DataFrame[], sort: BucketTime[]): DataFrame[] {
  return data.map((frame) => {
    const newframe = {
      ...frame,
      fields: frame.fields.map((f,i) => {
        if (f.name != sort[0].field) {
          return f
        }
        const v = f.values.toArray().map(f=>f*100)
        return {
          ...f,
          values: new ArrayVector(v),
        };
      }),
    };
    return newframe
  })
};
