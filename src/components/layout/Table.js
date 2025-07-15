import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

export const TableHeader = styled.thead`
  background-color: #1565c0;
  color: white;
`;

export const TableHeaderCell = styled.th`
  padding: 15px;
  text-align: left;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f5f5f5;
  }
  
  &:hover {
    background-color: #e3f2fd;
  }
`;

export const TableCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #e0e0e0;
`;

export const TableActionCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  gap: 10px;
`;