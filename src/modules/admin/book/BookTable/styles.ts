import styled from "styled-components";
import Modal from "../BookForm/modal";


// jsx스타일-css
export const BookContainer = styled.div`
header {
    input {
      border: 1px solid green;
    }

    > button {
      border: 1px solid green;
      background: white;
    }
  }

  ul {
    margin-top: 20px;

    li {
      padding: 7px;
      border: 1px solid green;
      margin-bottom: 3px;
      width: fit-content;

      button {
        border: 1px solid gray;
        margin-right: 3px;
      }
    }
  }

  footer {
    color: green;

    data {
      font-weight: bold;
    }
  }

  #app-theme.light & {
    header {
      input {
        background-color: white;
        color: black;
      }
    }
  }

  #app-theme.dark & {
    header {
      input {
        background-color: black;
        color: white;
      }
    }
  }
`;

export const TableContainer = styled.div`
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 10px 0;
    overflow-x: auto;
  }

  th {
    background-color: #f2f2f2;
    border: 1px solid #ddd;
    padding: 5px;
    text-align: left;
  }

  td {
    border: 1px solid #ddd;
    padding: 5px;
  }

  tr {
    background-color: #f9f9f9;
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;



export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  width: 100%;
`;

export const ButtonContainer = styled.div`
 display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 0px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 40px;
  
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: auto;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 10px auto;
`;

export const Button = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: #45a044;
  color: white;
  &:hover {
    background-color: darkgreen;
  }
  transition: background-color 0.5s ease;
`;

export const Input = styled.input`
  margin-right: 10px;
  padding: 10px;
`;

export const Select = styled.select`
margin-right: 10px;
padding: 10px;

`;