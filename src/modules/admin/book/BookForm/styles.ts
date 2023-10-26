import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  margin: 10px;
  padding-top: 50px;
  border-radius: 10px;
  overflow-y: auto;
  max-height: 90vh;

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 20px;
    background-color: darkgreen;
    font-size: 40px;
    padding: 50px;
  }

  input {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  textarea {
    font-family: Arial, sans-serif;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
    min-height: 100px;
    max-height: 100px;
    height: 100px;
    overflow-y: auto;
  }

  button {
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
  }
`;
