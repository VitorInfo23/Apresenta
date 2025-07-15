import styled from 'styled-components';

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #1e88e5;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #1e88e5;
  border-radius: 8px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #64b5f6;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
  }
`;

export const DatePicker = styled.input.attrs({ type: 'date' })`
  width: 100%;
  padding: 10px;
  border: 1px solid #1e88e5;
  border-radius: 8px;
  font-size: 16px;
`;

export const TimePicker = styled.input.attrs({ type: 'time' })`
  width: 100%;
  padding: 10px;
  border: 1px solid #1e88e5;
  border-radius: 8px;
  font-size: 16px;
`;