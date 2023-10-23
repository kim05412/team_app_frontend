// Modal.styles.js
import styled from "@emotion/styled";

export const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 400px;

  max-height: calc(100vh - 40px);

  background-color: #fff;

  padding: 20px;

  overflow-y: auto;

  /* Add more styles as you want */
`;

export const FormItem = styled.div`
  margin-bottom: 10px;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input[type="text"] {
    width: 100%;
    padding: 8px;
  }
`;
