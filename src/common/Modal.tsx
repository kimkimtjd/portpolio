// Modal.tsx
import React from "react";
import styled, { keyframes } from "styled-components";

interface ModalProps {
  isOpen: boolean;
  // onClose: () => void;
  children: React.ReactNode;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Modal: React.FC<ModalProps> = ({ isOpen,children }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        {/* <CloseButton onClick={onClose}>×</CloseButton> */}
        {children}
      </ModalWrapper>
    </Overlay>
  );
};

export default Modal;

// styled-components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  overflow-y: auto;
  align-items: center;
  animation: ${fadeIn} 0.2s ease-in-out;
  z-index: 999;
`;

const ModalWrapper = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  position: relative;
`;
