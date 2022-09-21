import { GpeQuery } from '../types/query';
import { VisualizationQueryVariables } from '../client/queries/queries';

export const buildVisualizationVars = (
  target: Partial<GpeQuery>,
  { epoch_start, epoch_end }: { epoch_start: number, epoch_end:number }
): VisualizationQueryVariables => {
  const {
    types,
    tags,
    custom_tags,
    item_ids,
    related_to_types,
    related_to_tags,
    related_to_custom_tags,
    related_to_item_ids,

    summary,
    samples,

    vis_id

  } = target;

  let vars: VisualizationQueryVariables = {
    epoch_start,
    epoch_end,

    custom_tags,
    types,
    tags,
    item_ids,

    summary,
    samples,

    // empty
    related_to_types: [],
    related_to_tags: [],
    related_to_custom_tags: [],
    related_to_item_ids: [],

    vis_id: vis_id ?? ''
  };

  if (target.use_related_to === true) {
    vars = {
      ...vars,
      related_to_types: related_to_types ?? '',
      related_to_tags,
      related_to_custom_tags: related_to_custom_tags ?? '',
      related_to_item_ids,
    };
  }

  if (vars.samples) {
    vars.summary = null;
  }

  return vars;
};
