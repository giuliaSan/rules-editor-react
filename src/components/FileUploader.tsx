import React from "react";
import { RuleGroup } from "../types/rule";

interface FileUploaderProps {
  onFileUpload: (data: RuleGroup[]) => void; // Using RuleGroup[] as the type for data
}


const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string) as RuleGroup[]; // Parse and cast to RuleGroup[]
          onFileUpload(data); // Pass the typed data to the parent
        } catch (error: unknown) {
          // Narrow the error type down
          if (error instanceof Error) {
            alert(`Errore nel parsing del file JSON: ${error.message}`);
          } else {
            alert("Errore sconosciuto nel parsing del file JSON");
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
