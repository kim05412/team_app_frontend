import styled from "@emotion/styled";

export const Hits_URL = "http://localhost:8082/hits";

export interface User{
     id: number;
     nickname : String;
     bookmark: String;
     ageGroup: number;
     genderGroup: String;
}
export interface Book {
    id: number;
    createdDate: string;
    publisher: string;
    title: string;
    author: string;
    itemId: number;
    categoryName: string;
  }



export const StatsContainer = styled.div`
  button {
    background-color: #529e4f;
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

h1{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
  
  font-size: 20px;
 
  padding: 40px;
  border-radius: 8px;
  width: 88%;  
  
}

`;