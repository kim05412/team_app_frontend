import styled from "styled-components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const StyledButton = styled.button`
  padding: 15px;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  background-color: #45a044;
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
  top: 0; // 상단에 고정
  right: 0; // 오른쪽에 고정
  padding: 10px;
`;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        top: 0,
        left: 0,
        padding: "100px",
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
          paddingTop: "70px",
          paddingBottom: "20px",
          paddingLeft: "100px",
          paddingRight: "100px",
          borderRadius: "8px",
          height: "900px", // 흰색 바탕의 높이를 900px로 설정
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center", // 중앙 정렬
        }}>
        <ButtonContainer>
          <StyledButton onClick={onClose}>X</StyledButton>
        </ButtonContainer>
        {children}
      </div>
    </div>
  );
};

export default Modal;
