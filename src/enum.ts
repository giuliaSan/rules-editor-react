// Comparison Operators
export const comparisonOperators: string[] = [
  "string_contain",
  "not_equal",
  "equal",
  "include",
  "below",
  "above",
  "gte",
  "lte",
  "gt",
  "lt",
];

// Comparison Value Types
export const comparisonValueTypes: string[] = [
  "int",
  "str",
  "bool",
  "list_str",
];

// Comparison Types
export const comparisonTypes: string[] = [
  "lead_type",
  "mortgage_amount",
  "property_type",
  "utm_source",
  "utm_medium",
  "search_status",
  "target_mad",
  "purchase_period",
  "employment_status_first",
  "employment_status_second",
  "employment_sector_first",
  "employment_sector_second",
  "sustainability",
];

// Field Options for `str` Values
export const fieldOptions: Record<string, string[]> = {
  lead_type: ["lead", "portfolio"],
  property_type: ["first_house", "second_house", "subrogation"],
  search_status: [
    "started_searching",
    "visited_some",
    "to_make_bid",
    "bid_made",
    "signed_sale_agreement",
    "property_owner",
  ],
  employment_status_first: [
    "apprenticeship",
    "self_employed",
    "temporary",
    "permanent",
    "retired",
    "unemployed",
  ],
  employment_status_second: [
    "apprenticeship",
    "self_employed",
    "temporary",
    "permanent",
    "retired",
    "unemployed",
  ],
  employment_sector_first: [
    "fixed_0 (privato)",
    "fixed_1 (pubblico)",
    "piva_0",
    "piva_1",
    "piva_2",
    "piva_3",
    "piva_4",
    "piva_5",
  ],
  employment_sector_second: [
    "fixed_0 (privato)",
    "fixed_1 (pubblico)",
    "piva_0",
    "piva_1",
    "piva_2",
    "piva_3",
    "piva_4",
    "piva_5",
  ],
  purchase_period: ["3_months", "3_6_months", "6_12_months", "over_12_months"],
  target_mad: ["true", "false"],
  sustainability: ["high", "low"],
};

// Group IDs
export const groupIds: Record<string, string> = {
  Specialist: "067c809c-9111-7b3f-8000-6103f1949959",
  Ricerca: "067c809c-9111-7c4b-8000-7041d6e8e6aa",
  Proposta: "067c809c-9111-7c8e-8000-5c5cf673a491",
  "Pre-MaD Predelibera": "067c809c-9111-7cc1-8000-abf57516eb16",
  Customer: "067c809c-9111-7d14-8000-31147c5d6f97",
  BPO: "067c809c-9111-7d47-8000-aa9fa5482966",
  "Non Assegnati": "067c809c-9111-7d68-8000-d6e8eb8c896c",
  Trovato: "067c809c-9111-7dbc-8000-009ebcc03cb1",
  "Pre-MaD Mutuo": "067c8147-35ad-770e-8000-ba95a621bae1",
};
