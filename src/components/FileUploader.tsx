import React from "react";
import { RuleGroup } from "../types/rule";

interface FileUploaderProps {
  onFileUpload: (data: RuleGroup[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string) as RuleGroup[];
          onFileUpload(data);
        } catch (error: unknown) {
          if (error instanceof Error) {
            alert(`Error in Json parsing: ${error.message}`);
          } else {
            alert("Unknown error in Json parsing");
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default FileUploader;
