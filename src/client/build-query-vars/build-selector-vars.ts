import { GpeQuery } from '../../types/query';
import { ItemsWithMetricsQueryVariables } from '../queries/queries';


type ItemSelectorQueryVariables = Pick<ItemsWithMetricsQueryVariables,
  'types' | 'tags' | 'custom_tags' | 'item_ids' | 'item_regex' | 'related_to_types' | 'related_to_tags' | 'related_to_custom_tags' | 'related_to_item_ids' | 'related_to_item_regex'
>

export const buildSelectorVars = (
  target: Partial<GpeQuery>
): ItemSelectorQueryVariables => {
  let {
    use_related_to,

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

  } = target;

  let vars: ItemSelectorQueryVariables = {
    types: types ?? [],
    tags,
    custom_tags: custom_tags ?? '',
    item_ids,
    item_regex,

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
      related_to_types: related_to_types ?? [],
      related_to_tags: related_to_tags ?? [],
      related_to_custom_tags: related_to_custom_tags ?? [],
      related_to_item_ids: related_to_item_ids ?? [],
      related_to_item_regex: related_to_item_regex ?? ''
    };
  }

  //regex overrides specfic selector
  if (typeof item_regex === 'string' && item_regex !== '') {
    vars.item_ids = []
  }
  if (typeof related_to_item_regex === 'string' && related_to_item_regex !== '') {
    vars.related_to_item_ids = []
  }

  return vars;
};
