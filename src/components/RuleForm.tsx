import React, { useState, useEffect } from "react";
import { Rule } from "../types/rule";
import { comparisonTypes, comparisonOperators, comparisonValueTypes } from "../enum";

interface RuleFormProps {
  initialRule?: Rule;
  onSave: (rule: Rule) => void;
  onCancel: () => void;
}

const RuleForm: React.FC<RuleFormProps> = ({ initialRule, onSave, onCancel }) => {
  // Assicurati di clonare l'oggetto initialRule per evitare la mutazione accidentale
  const [rule, setRule] = useState<Rule>(structuredClone(initialRule) || {
    comparison_type: "",
    comparison_operator: "",
    comparison_value_type: "",
    value: "",
  });

  useEffect(() => {
    if (initialRule) {
      // Quando `initialRule` cambia, aggiorna `rule` con una copia clonata
      setRule(structuredClone(initialRule));
    }
  }, [initialRule]);

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
      value: value.includes(",") ? value.split(",") : value, // Supporta liste di stringhe
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(structuredClone(rule)); // Passa una copia dell'oggetto rule
  };

  return (
    <form onSubmit={handleSubmit} className="box p-6">
      <div className="field">
        <label className="label">Comparison Type</label>
        <div className="control">
          <div className="select is-fullwidth">
            <select name="comparison_type" value={rule.comparison_type} onChange={handleChange}>
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
            className="input is-fullwidth" style={{ fontSize: '0.9rem' }}
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

export default RuleForm;
