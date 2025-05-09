import React, { useState } from "react";
import FileUploader from "./components/FileUploader";
import RuleTable from "./components/RuleTable";
import RuleForm from "./components/RuleEdit";
import RuleAdd from "./components/RuleAdd";
import SaveButton from "./components/SaveButton";
import { RuleGroup, Rule} from "./types/rule";
import { saveJson } from "./utils/JsonHandler";
import Modal from './components/Modal';


const App: React.FC = () => {
  const [ruleGroups, setRuleGroups] = useState<RuleGroup[]>([]);
  const [editingRule, setEditingRule] = useState<RuleGroup | null>(null);
  const [editingRuleIndex, setEditingRuleIndex] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); 
  const [currentGlobalIndex, setCurrentGlobalIndex] = useState<number | null>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const handleFileUpload = (data: RuleGroup[]) => {
    setRuleGroups(data);
  };

  const handleAddRule = (group_id: string, group_name: string, operator: string, newRule: Rule) => {
    setRuleGroups((prevGroups) => {
      const updatedGroups = [...prevGroups];
      const existingGroupIndex = updatedGroups.findIndex((group) => group.group_id === group_id);

      if (existingGroupIndex !== -1) {
        updatedGroups[existingGroupIndex].rules.push(newRule);
      } else {
        updatedGroups.push({
          group_id,
          name: group_name,
          operator,
          rules: [newRule],
        });
      }
  
      return updatedGroups;
    });
  
    setIsAddModalVisible(false);
  };

  const handleSave = (updatedRule: Rule, globalIndex: number) => {

    let currentGlobalIndex = 0; 
    let found = false; 
      const updatedGroups = ruleGroups.map(group => {
      const updatedRules = group.rules.map(rule => {
        if (!found && currentGlobalIndex === globalIndex) {
          found = true;
          return updatedRule;
        }
        currentGlobalIndex++;
        return rule;
      });
      return { ...group, rules: updatedRules }; 
    });
  
    setRuleGroups(updatedGroups);
    setIsModalVisible(false);
  };

  const handleEditRule = (groupId: string, ruleIndex: number, globalIndex: number) => {
    console.log("Editing rule at global index:", globalIndex);
    const validGlobalIndex = globalIndex !== null ? globalIndex : -1;

    const group = ruleGroups.find((group) => group.group_id === groupId);
    console.log('group editing ', group)
    if (group) {
      setEditingRule(group);
      setEditingRuleIndex(ruleIndex);
      setCurrentGlobalIndex(validGlobalIndex); 
      setIsModalVisible(true);
    }
  };


const handleDeleteRule = (groupId: string, ruleIndex: number, globalIndex: number) => {
  console.log("Deleting rule at global index:", globalIndex);
  const updatedGroups = ruleGroups.map((group) => {
    if (group.group_id === groupId) {
      const updatedRules = group.rules.filter((_, index) => index !== ruleIndex);
      return { ...group, rules: updatedRules };
    }
    return group;
  });
  setRuleGroups(updatedGroups);
};

const handleCancel = () => {
  setIsModalVisible(false); 
};

  const handleSaveUpdatedJson = () => {
    saveJson(ruleGroups);
  };

  return (
    <div id="content-main">
      <h2>Rules Editor</h2>
      <div className="file-uploader-container">
        <FileUploader onFileUpload={handleFileUpload} />
      </div>
      {ruleGroups.length > 0 && (
        
        <div className="table-content-container">
         
          <SaveButton onSave={handleSaveUpdatedJson} />
          <button onClick={() => setIsAddModalVisible(true)} className="button is-primary is-green is-pulled-right mr-6 mb-3">
            Add +
          </button>
          <RuleTable
            ruleGroups={ruleGroups}
            onEditRule={handleEditRule}
            onDeleteRule={handleDeleteRule}
          />
        </div>
      )}
      <Modal isVisible={isModalVisible} onClose={handleCancel}>
        {editingRule && editingRuleIndex !== null && (
          <RuleForm 
            initialRule={editingRule.rules[editingRuleIndex]} 
            globalIndex={currentGlobalIndex}
            onSave={handleSave} 
            onCancel={handleCancel} 
          />
        )}
      </Modal>
      <Modal isVisible={isAddModalVisible} onClose={() => setIsAddModalVisible(false)}>
          <RuleAdd
            onSave={handleAddRule}
            onCancel={() => setIsAddModalVisible(false)}
          />
      </Modal>
    </div>  
  );
};

export default App;
