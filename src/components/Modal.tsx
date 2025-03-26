import React from 'react';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="overlay">
      <div className="container-modal">
        <button onClick={onClose} className="close-button">X</button>
        {children}
      </div>
    </div>
  );
};


export default Modal;
