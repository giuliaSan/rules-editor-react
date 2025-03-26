
interface SaveButtonProps {
  onSave: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onSave }) => {
  return <button className="button is-primary custom-button is-pulled-left ml-3 mb-6" onClick={onSave}>Save JSON</button>;
};

export default SaveButton;
