import styled from 'styled-components';

export const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({ primary }) => (primary ? '#1565c0' : '#e57373')};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  min-width: 120px;
  
  &:hover {
    background-color: ${({ primary }) => (primary ? '#0d47a1' : '#d32f2f')};
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;