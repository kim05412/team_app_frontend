// inventory.style.tsx

import styled from "styled-components";

export const InventoryPage = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
`;

export const InventoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const InventoryTableHeader = styled.thead`
  background-color: #333;
  color: #fff;
`;

export const InventoryTableBody = styled.tbody`
  background-color: #fff;
`;

export const InventoryImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

export const TableData = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

export const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
`;

export const SearchInput = styled.input`
  margin-right: 10px;
  padding: 5px;
`;

export const SearchButton = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

export const EditDeleteButton = styled.button`
  margin-right: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

export const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

export const Footer = styled.footer`
  margin-top: 20px;
`;
