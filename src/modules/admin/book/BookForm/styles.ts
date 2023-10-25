import styled from "styled-components";

// export const FormContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   background-color: #ffffff;
//   border-radius: 8px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   gap: 20px;
//   padding: 20px;
//   margin: 16px;
//   padding-top: 50px;
//   border-radius: 10px;
//   overflow-y: auto;
//   max-height: 90vh;
//   width: 700px;
//   align-items: flex-start;

//   input {
//     border: 1px solid #e1e4e8;
//     border-radius: 4px;
//     box-sizing: border-box;
//     font-size: 14px;
//     padding: 8px;
//     width: calc(100% - 26px);
//     margin-bottom: 10px;
//   }
//   textarea {
//     border: 1px solid #e1e4e8;
//     border-radius: 4px;
//     box-sizing: border-box;
//     font-size: 14px;
//     padding: 8px;
//     width: calc(100% - 26px);
//     resize: none;
//     min-height: 100px;
//     max-height: 100px;
//     height: 100px;
//     overflow-y: auto;
//   }

//   p {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     text-align: center;
//     margin-bottom: 20px;
//     background-color: darkgreen;
//     font-size: 40px;
//     padding: 40px;
//     border-radius: 8px;
//   }

//   button {
//     background-color: #4caf50;
//     border: none;
//     border-radius: 4px;
//     color: #ffffff;
//     cursor: pointer;
//     font-size: 14px;
//     margin-right: 20px;
//     margin-left: 20px;
//     padding: 10px 15px;
//   }

//   button:hover {
//     background-color: darkgreen;
//   }

//   div {
//     display: flex;
//     justify-content: center;
//     margin-top: 20px;
//   }

//   label {
//     display: flex;
//     margin-bottom: 5px;
//   }
// `;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 16px;
  overflow-y: auto;
  max-height: 90vh;
  width: 700px;

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 20px;
    background-color: darkgreen;
    font-size: 40px;
    padding: 40px;
    border-radius: 8px;
    width: 88%;
  }

  label {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-left: 40px;
    margin-bottom: 8px;
    width: 88%;

    span {
      flex: 0.2;
      /* text-align: right; */
      /* padding-left: 5%; // 라벨 텍스트와 인풋 박스 사이의 간격 */
    }
  }

  input,
  textarea {
    flex: 0.8;
    border: 1px solid #e1e4e8;
    border-radius: 4px;
    padding: 8px;
    font-size: 14px;
    width: 60%;
  }

  textarea {
    resize: none;
    min-height: 100px;
    max-height: 100px;
  }

  button {
    background-color: #45a044;
    border: none;
    border-radius: 4px;
    color: #ffffff;
    cursor: pointer;
    font-size: 14px;
    padding: 10px 15px;
    margin-right: 10px;

    &:hover {
      background-color: darkgreen;
    }
  }

  div {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
`;
