import React from 'react';
import { useParams } from 'react-router-dom';
import VooForm from '../components/voos/VooForm';

const EditarVooPage = () => {
  const { id } = useParams();
  
  return (
    <div className="container">
      <VooForm id={id} />
    </div>
  );
};

export default EditarVooPage;