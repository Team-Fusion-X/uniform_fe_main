import React from 'react';
import './modal.css';

const Modal = ({ closeModal }) => {
  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <div className="modalHeader">
          <h2 className='h21'>로딩 중..</h2>
          <button className="closeButton" onClick={closeModal}>
            &times;
          </button>
        </div>
        <div className="modalBody">
          <p className='p1'>자기소개서를 완성하고 있는 중입니다! 잠시만 기다려주세요!</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;