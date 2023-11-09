// publisher.style.tsx
import { Link } from "react-router-dom";
import styled from "styled-components";

export const PublisherPage = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
`;

export const PublisherTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
`;

export const PublisherTableHeader = styled.thead`
  background-color: #333;
  color: #fff;
`;

export const PublisherTableBody = styled.tbody`
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

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  &:hover {
    color: #0056b3;
  }
`;
