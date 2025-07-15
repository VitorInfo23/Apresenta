import React from 'react';
import { useParams } from 'react-router-dom';
import PassageiroForm from '../components/passageiros/PassageiroForm';

const EditarPassageiroPage = () => {
  const { cpf } = useParams();
  
  return (
    <div className="container">
      <PassageiroForm cpf={cpf} />
    </div>
  );
};

export default EditarPassageiroPage;