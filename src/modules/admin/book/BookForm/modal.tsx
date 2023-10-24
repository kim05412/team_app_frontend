import styled from "styled-components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const StyledButton = styled.button`
  padding: 10px;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  background-color: lightgreen;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: darkgreen;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%); // 좌우 중앙에 배치하기 위해 사용
`;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        padding: "100px",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}>
      <div
        style={{
          backgroundColor: "#fff",
          padding: "100px",
          borderRadius: "8px",
        }}>
        <ButtonContainer>
          <StyledButton onClick={onClose}>Close</StyledButton>
          {/* <StyledButton onClick={temporary}>임시저장</StyledButton> */}
          {/* <StyledButton onClick={onSave}>저장</StyledButton> */}
        </ButtonContainer>
        {children}
      </div>
    </div>
  );
};

export default Modal;
