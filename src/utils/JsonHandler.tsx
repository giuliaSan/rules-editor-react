import { RuleGroup } from "../types/rule";

export const saveJson = (data: RuleGroup[]) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "updated_rules.json";
  link.click();
};

export const loadJson = (file: File): Promise<RuleGroup[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        resolve(data);
      } catch (error) {
        reject("Errore nel parsing del file JSON");
      }
    };
    reader.readAsText(file);
  });
};
