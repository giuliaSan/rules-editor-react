
interface SaveButtonProps {
  onSave: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onSave }) => {
  return <button className="button is-primary custom-button is-pulled-right mr-6 mb-6" onClick={onSave}>Save JSON</button>;
};

export default SaveButton;
