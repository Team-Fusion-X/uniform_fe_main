import React from 'react';
import './FullAnalModal.css';

const Modal = ({ closeModal }) => {
  return (
    <div className="fullAnalModalOverlay">
      <div className="fullAnalModalContent">
        <div className="fullAnalModalHeader">
          <h2 className='fullAnalModalTitle'>분석 완료!</h2>
          <button className="fullAnalModalCloseButton" onClick={closeModal}>
            &times;
          </button>
        </div>
        <div className="fullAnalModalBody">
          <p className='fullAnalModalDescription'>
            분석 결과는 여유, 적절, 도전, 위험으로 나뉘어지며, 각각의 버튼을 클릭하면 결과를 확인하실 수 있습니다!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;