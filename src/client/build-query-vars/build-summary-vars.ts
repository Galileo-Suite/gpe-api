import { GpeQuery } from '../../types/query';
import { ItemsWithMetricsQueryVariables } from '../queries/queries';


type ItemSelectorQueryVariables = Pick<ItemsWithMetricsQueryVariables,
  'summary' | 'samples'
>

export const buildSummaryVars = (
  target: Partial<GpeQuery>
): ItemSelectorQueryVariables => {
  let {
    summary,
    samples,
  } = target;

  let vars: ItemSelectorQueryVariables = {};

  if (typeof summary == 'string'){
    vars.summary = parseInt(summary)
  }
  if (typeof summary == 'number'){
    vars.summary = summary
  }

  if (typeof samples == 'string'){
    vars.samples = parseInt(samples)
  }
  if (typeof samples == 'number'){
    vars.samples = samples
  }

  if (vars.samples) {
    vars.summary = null;
  }

  return vars;
};
