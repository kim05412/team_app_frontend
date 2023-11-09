// Statistics.style.tsx
import styled from "styled-components";

export const StatisticsPage = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
`;

export const StatisticsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
`;

export const StatisticsTableHeader = styled.thead`
  background-color: #333;
  color: #fff;
`;

export const StatisticsTableBody = styled.tbody`
  background-color: #fff;
`;

export const TableData = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

export const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
`;

export const CustomButton = styled.button`
  border: none;
  background-color: #007bff;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
