import { GpeQuery } from '../../types/query';
import { TransientsQueryVariables } from '../queries/queries';

export const buildTransientVars = (
  target: Partial<GpeQuery>,
  { epoch_start, epoch_end }: { epoch_start: number, epoch_end:number }
): TransientsQueryVariables => {
  let {
    use_related_to,

    types,
    tags,
    custom_tags,
    item_ids,
    item_regex,
    configs,

    related_to_types,
    related_to_tags,
    related_to_custom_tags,
    related_to_item_ids,

    transient_type,
    transient_fields,
    transient_where
  } = target;

  let vars: TransientsQueryVariables = {
    epoch_start,
    epoch_end,
    types: types ?? '',
    tags,
    custom_tags: custom_tags ?? '',
    item_ids,
    item_regex,

    // empty
    configs: [],

    // empty
    related_to_types: [],
    related_to_tags: [],
    related_to_custom_tags: [],
    related_to_item_ids: [],

    // emptys
    transient_fields: [],
    transient_type: '',
    transient_where,
  };

  if (use_related_to === true) {
    vars = {
      ...vars,
      related_to_types: related_to_types ?? '',
      related_to_tags,
      related_to_custom_tags: related_to_custom_tags ?? '',
      related_to_item_ids,
    };
  }

  vars = {
    ...vars,
    configs: configs ?? [],
    transient_fields: transient_fields ?? [],
    transient_type: transient_type ?? ''
  }

  if (vars.samples) {
    vars.summary = null;
  }

  return vars;
};
