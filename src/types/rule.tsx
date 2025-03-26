export interface Rule {
  comparison_type: string;
  comparison_operator: string;
  comparison_value_type: string;
  value: string | number | boolean | string[];
}

export interface RuleGroup {
  group_id: string;
  name: string;
  rules: Rule[];
  operator: string;
}