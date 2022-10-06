import { GpeQuery } from '../../types/query';
import { ItemsWithMetricsQueryVariables } from '../queries/queries';


export const buildItemWithMetricsVars = (
  target: Partial<GpeQuery>,
  { epoch_start, epoch_end }: { epoch_start: number, epoch_end:number }
): ItemsWithMetricsQueryVariables => {
  let {
    use_related_to,

    types,
    tags,
    custom_tags,
    item_ids,
    item_regex,
    configs,
    formulas,
    summary,
    samples,

    related_to_types,
    related_to_tags,
    related_to_custom_tags,
    related_to_item_ids,
    related_to_item_regex,

  } = target;

  let vars: ItemsWithMetricsQueryVariables = {
    epoch_start,
    epoch_end,
    types: types ?? '',
    tags,
    custom_tags: custom_tags ?? '',
    item_ids,
    item_regex,

    // empty
    configs: [],
    formulas: [],
    summary: null,
    samples: null,

    // empty
    related_to_types: [],
    related_to_tags: [],
    related_to_custom_tags: [],
    related_to_item_ids: [],
    related_to_item_regex: "",
  };

  if (use_related_to === true) {
    vars = {
      ...vars,
      related_to_types: related_to_types ?? '',
      related_to_tags,
      related_to_custom_tags: related_to_custom_tags ?? '',
      related_to_item_ids,
      related_to_item_regex
    };
  }

  vars = {
    ...vars,
    configs: configs ?? [],
    formulas: formulas?.filter(f=>f !== "") ?? [], // incase user inputs empty string, purely for working case where user has empty formula we don't want to send it
    summary,
    samples,
  }


  if (vars.samples) {
    vars.summary = null;
  }

  return vars;
};
