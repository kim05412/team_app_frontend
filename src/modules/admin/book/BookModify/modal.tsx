import styled from "styled-components";

const ModalContainer = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  padding: 100px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  padding: 15px;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  background-color: #45a044;
  color: white;
  cursor: pointer;
  position: absolute; /* 절대 위치 지정 */
  top: 0; /* 상단에 정렬 */
  right: 0; /* 오른쪽에 정렬 */
  margin-top: 1%;
  margin-right: 2%;

  &:hover {
    background-color: darkgreen;
  }
`;

const UpModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={onClose}>x</CloseButton>
        {children}
      </ModalContent>
    </ModalContainer>
  );
};

export default UpModal;
