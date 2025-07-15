import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/layout';
import { useAuth } from '../context/AuthContext';

const MainContainer = styled.div`
  padding: 40px;
  background-color: #f4f8ff;
  min-height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  color: #1565c0;
  margin-bottom: 40px;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const MainPage = () => {
  const history = useHistory();
  const { logout } = useAuth();

  const buttons = [
    { text: 'Cadastrar Passageiro', path: '/cadastrar-passageiro' },
    { text: 'Lista de Passageiros', path: '/passageiros' },
    { text: 'Cadastrar Voo', path: '/cadastrar-voo' },
    { text: 'Lista de Voos', path: '/voos' },
    { text: 'Reservar Voo', path: '/reservar-voo' },
    { text: 'Lista de Reservas', path: '/reservas' },
  ];

  const handleTrocarConta = () => {
    logout();
    history.push('/');
  };

  return (
    <MainContainer>
      <Title>Tela Principal</Title>
      <ButtonGrid>
        {buttons.map((button, index) => (
          <Button 
            key={index} 
            primary 
            onClick={() => history.push(button.path)}
            style={{ height: '60px', fontSize: '16px' }}
          >
            {button.text}
          </Button>
        ))}
      </ButtonGrid>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <Button 
          onClick={handleTrocarConta}
          style={{ 
            backgroundColor: '#d32f2f', 
            color: 'white', 
            width: '200px',
            height: '50px',
            fontSize: '16px'
          }}
        >
          Trocar Conta
        </Button>
      </div>
    </MainContainer>
  );
};

export default MainPage;