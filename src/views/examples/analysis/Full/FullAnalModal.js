import React from 'react';
import './FullAnalModal.css';

const Modal = ({ isLoading }) => {
  if (!isLoading) {
    return null; // 로딩 중이 아닐 때는 아무 것도 렌더링하지 않음
  }

  return (
    <div className="fullAnalModalOverlay">
      <div className="fullAnalModalContent loading">
        <div className="fullAnalModalHeader">
          <h2 className='fullAnalModalTitle'>로딩 중...</h2>
        </div>
        <div className="fullAnalModalBody">
          <p className='fullAnalModalDescription'>
            분석을 진행 중입니다. 잠시만 기다려 주세요...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;