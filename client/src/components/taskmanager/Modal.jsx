// Modal.js
import React from 'react';
import './Modal.scss';

const Modal = ({ isOpen, onRequestClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close-btn" onClick={onRequestClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
