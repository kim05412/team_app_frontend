import styled from "styled-components";

export const OrderListContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  height: 100vh;
`;

export const OrderTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

export const TableHeader = styled.thead`
  background-color: #333;
  color: #fff;
`;

export const TableBody = styled.tbody`
  background-color: #fff;
`;

export const TableRow = styled.tr``;

export const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: left;
`;

export const TableCell = styled.td`
  padding: 10px;
  border-top: 1px solid #ddd;
`;

export const OrderButton = styled.button`
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ModalContainer = styled.div`
  padding: 20px;
`;

export const ModalTitle = styled.h2`
  margin-bottom: 10px;
`;

export const ModalSubtitle = styled.h3`
  margin-bottom: 20px;
`;

export const OrderItem = styled.li`
  margin-bottom: 10px;
`;

export const CloseButton = styled.button`
  padding: 5px 10px;
  border: none;
  background-color: #dc3545;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;
