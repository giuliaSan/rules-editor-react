import React from "react";
import { RuleGroup } from "../types/rule";

interface RuleTableProps {
  ruleGroups: RuleGroup[];
  onEditRule: (groupId: string, ruleIndex: number, globalIndex: number) => void;
  onDeleteRule: (groupId: string, ruleIndex: number, globalIndex: number) => void;
}

const RuleTable: React.FC<RuleTableProps> = ({ ruleGroups, onEditRule, onDeleteRule }) => {
  let globalIndex = 0; 

  return (
    <table id="rules-table">
      <thead>
        <tr>
          <th>Index</th>
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
          group.rules.map((rule, ruleIndex) => {
            const currentGlobalIndex = globalIndex++;
            return (
              <tr key={`${group.group_id}-${ruleIndex}`}>
                <td>{currentGlobalIndex}</td>
                <td>{group.group_id}</td>
                <td>{group.name}</td>
                <td>{group.operator}</td>
                <td>{rule.comparison_type}</td>
                <td>{rule.comparison_operator}</td>
                <td>{rule.comparison_value_type}</td>
                <td>{Array.isArray(rule.value) ? rule.value.join(", ") : rule.value}</td>
                <td className="td-bigger">
                  <button onClick={() => onEditRule(group.group_id, ruleIndex, currentGlobalIndex)}>Edit</button>
                  <button onClick={() => onDeleteRule(group.group_id, ruleIndex, currentGlobalIndex)}>Delete</button>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default RuleTable;
