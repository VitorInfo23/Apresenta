import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
`;

const LoginForm = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const Title = styled.h1`
  color: #1565c0;
  text-align: center;
  margin-bottom: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #1e88e5;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #1e88e5;
  border-radius: 8px;
  font-size: 16px;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #1565c0;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0d47a1;
  }
`;

const LoginPage = () => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { login } = useAuth();
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');

    const success = await login(cpf, senha);
    
    if (success) {
      history.push('/main');
    } else {
      setErro('CPF ou senha inválidos.');
    }
  };

  return (
    <LoginContainer>
      <LoginForm>
        <Title>Login</Title>
        {erro && <div style={{ color: 'red', marginBottom: '15px' }}>{erro}</div>}
        <form onSubmit={handleLogin}>
          <FormGroup>
            <Label>CPF:</Label>
            <Input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Digite seu CPF"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Senha:</Label>
            <Input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </FormGroup>
          <LoginButton type="submit">Entrar</LoginButton>
        </form>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginPage;