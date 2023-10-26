import styled from "styled-components";
import Modal from "../BookAdd/modal";

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
    margin: 20px 0;
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
