import React, { useState } from "react";
import { Rule } from "../types/rule";
import { comparisonTypes, comparisonOperators, comparisonValueTypes } from "../enum";

interface RuleAddProps {
  onSave: (group_id: string, group_name: string, operator: string, rule: Rule) => void;
  onCancel: () => void;
}

const RuleAdd: React.FC<RuleAddProps> = ({ onSave, onCancel }) => {
  const [group_id, setGroupId] = useState<string>("");
  const [group_name, setGroupName] = useState<string>("");
  const [operator, setOperator] = useState<string>("AND");

  const [rule, setRule] = useState<Rule>({
    comparison_type: "",
    comparison_operator: "",
    comparison_value_type: "",
    value: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setRule((prevRule) => ({
      ...prevRule,
      [e.target.name]: e.target.value,
    }));
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRule((prevRule) => ({
      ...prevRule,
      value: value.includes(",") ? value.split(",") : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(group_id, group_name, operator, rule);
  };


  return (
    <form onSubmit={handleSubmit} className="box p-6">
      <h2 className="title is-4">Add New Rule</h2>
      <div className="field">
        <label className="label">Group ID</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={group_id}
            onChange={(e) => setGroupId(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Group Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={group_name}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Operator</label>
        <div className="control">
          <div className="select is-fullwidth">
            <select value={operator} onChange={(e) => setOperator(e.target.value)}>
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>
          </div>
        </div>
      </div>
      <div className="field">
        <label className="label">Comparison Type</label>
        <div className="control">
          <div className="select is-fullwidth">
            <select name="comparison_type" value={rule.comparison_type} onChange={handleChange}>
              <option value="" disabled>Select Type</option>
              {comparisonTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="field">
        <label className="label">Comparison Operator</label>
        <div className="control">
          <div className="select is-fullwidth">
            <select name="comparison_operator" value={rule.comparison_operator} onChange={handleChange}>
              <option value="" disabled>Select Operator</option>
              {comparisonOperators.map((operator) => (
                <option key={operator} value={operator}>{operator}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="field">
        <label className="label">Comparison Value Type</label>
        <div className="control">
          <div className="select is-fullwidth">
            <select name="comparison_value_type" value={rule.comparison_value_type} onChange={handleChange}>
              <option value="" disabled>Select Value Type</option>
              {comparisonValueTypes.map((valueType) => (
                <option key={valueType} value={valueType}>{valueType}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="field">
        <label className="label">Value</label>
        <div className="control">
          <input
            className="input is-fullwidth"
            type="text"
            name="value"
            value={
              Array.isArray(rule.value)
                ? rule.value.join(",")
                : typeof rule.value === "boolean"
                ? rule.value.toString()
                : rule.value
            }
            onChange={handleValueChange}
          />
        </div>
      </div>

      <div className="field is-grouped is-grouped-right">
        <div className="control">
          <button type="submit" className="button is-primary">Save</button>
        </div>
        <div className="control">
          <button type="button" className="button is-light" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </form>
  );
};

export default RuleAdd;
