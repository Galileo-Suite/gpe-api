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
    item_regex,

    related_to_types,
    related_to_tags,
    related_to_custom_tags,
    related_to_item_ids,
    related_to_item_regex,

    summary,
    samples,

    vis_id,
    filters,

  } = target;

  let vars: VisualizationQueryVariables = {
    epoch_start,
    epoch_end,

    custom_tags,
    types,
    tags,
    item_ids,
    item_regex,

    summary,
    samples,

    // empty
    related_to_types: [],
    related_to_tags: [],
    related_to_custom_tags: [],
    related_to_item_ids: [],
    related_to_item_regex: "",

    vis_id: (vis_id ?? [""])[0],
    filters,
    function: target.function,
  };

  if (target.use_related_to === true) {
    vars = {
      ...vars,
      related_to_types: related_to_types ?? '',
      related_to_tags,
      related_to_custom_tags: related_to_custom_tags ?? '',
      related_to_item_ids,
      related_to_item_regex,
    };
  }

  if (vars.samples) {
    vars.summary = null;
  }

  return vars;
};
