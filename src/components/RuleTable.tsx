import React from "react";
import { RuleGroup } from "../types/rule";

interface RuleTableProps {
  ruleGroups: RuleGroup[];
  onEditRule: (groupId: string, ruleIndex: number) => void;
  onDeleteRule: (groupId: string, ruleIndex: number) => void;
}

const RuleTable: React.FC<RuleTableProps> = ({ ruleGroups, onEditRule, onDeleteRule }) => {
  return (
    <table id="rules-table">
      <thead>
        <tr>
          <th>Group ID</th>
          <th>Group Name</th>
          <th>Operator</th>
          <th>Comparison Type</th>
          <th>Comparison Operator</th>
          <th>Comparison Value Type</th>
          <th>Value</th>
          <th className="td-bigger">Actions</th>
        </tr>
      </thead>
      <tbody>
        {ruleGroups.map((group) =>
          group.rules.map((rule, index) => (
            <tr key={`${group.group_id}-${index}`}>
              <td>{group.group_id}</td>
              <td>{group.name}</td>
              <td>{group.operator}</td>
              <td>{rule.comparison_type}</td>
              <td>{rule.comparison_operator}</td>
              <td>{rule.comparison_value_type}</td>
              <td>{Array.isArray(rule.value) ? rule.value.join(", ") : rule.value}</td>
              <td className="td-bigger">
                <button onClick={() => onEditRule(group.group_id, index)}>Edit</button>
                <button onClick={() => onDeleteRule(group.group_id, index)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default RuleTable;
