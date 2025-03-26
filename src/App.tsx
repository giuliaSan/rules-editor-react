import React, { useState } from "react";
import FileUploader from "./components/FileUploader";
import RuleTable from "./components/RuleTable";
import RuleForm from "./components/RuleForm";
import SaveButton from "./components/SaveButton";
import { RuleGroup, Rule} from "./types/rule";
import { saveJson } from "./utils/JsonHandler";
import Modal from './components/Modal'; // Import the modal


const App: React.FC = () => {
  const [ruleGroups, setRuleGroups] = useState<RuleGroup[]>([]);
  const [editingRule, setEditingRule] = useState<RuleGroup | null>(null);
  const [editingRuleIndex, setEditingRuleIndex] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // Modal visibility state

  console.log("ruleGroups", ruleGroups); // Log ruleGroups to verify its structure

  const handleFileUpload = (data: RuleGroup[]) => {
    setRuleGroups(data);
  };

  const handleSave = (updatedRule: Rule) => {
    if (editingRule && editingRuleIndex !== null) {
      const updatedGroups = ruleGroups.map((group) => {
        if (group.group_id === editingRule.group_id) {
          const updatedRules = [...group.rules];
          updatedRules[editingRuleIndex] = updatedRule;
          return { ...group, rules: updatedRules };
        }
        return group;
      });
      setRuleGroups(updatedGroups);
      setIsModalVisible(false); // Hide modal after saving
    }
  };

  const handleEditRule = (groupId: string, ruleIndex: number) => {
    const group = ruleGroups.find((group) => group.group_id === groupId);
    if (group) {
      setEditingRule(group);
      setEditingRuleIndex(ruleIndex);
      setIsModalVisible(true); // Show modal
    }
  };


const handleDeleteRule = (groupId: string, ruleIndex: number) => {
  const updatedGroups = ruleGroups.map((group) => {
    if (group.group_id === groupId) {
      const updatedRules = group.rules.filter((_, index) => index !== ruleIndex);
      return { ...group, rules: updatedRules };
    }
    return group;
  });
  setRuleGroups(updatedGroups);  // Apply the updated groups to the state
};

const handleCancel = () => {
  setIsModalVisible(false); // Hide modal on cancel
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
            onSave={handleSave} 
            onCancel={handleCancel} 
          />
        )}
      </Modal>
    </div>  
  );
};

export default App;
