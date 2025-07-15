import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, FormGroup, Label, Input } from '../layout';
import { ComboBox, ComboBoxContainer, ComboBoxLabel } from '../layout/ComboBox';
import { PassageiroService, VooService, ReservaService } from '../../services';
import { format } from 'date-fns';

const ReservaForm = () => {
  const [passageiros, setPassageiros] = useState([]);
  const [voos, setVoos] = useState([]);
  const [formData, setFormData] = useState({
    idPassageiro: '',
    idVoo: ''
  });
  const [erro, setErro] = useState('');
  const history = useHistory();
  const [dataHoraAtual, setDataHoraAtual] = useState('');

  useEffect(() => {
    // Atualizar data e hora atual a cada segundo
    const timer = setInterval(() => {
      setDataHoraAtual(format(new Date(), 'dd/MM/yyyy HH:mm:ss'));
    }, 1000);
    
    // Carregar passageiros e voos
    const carregarDados = async () => {
      try {
        const passageirosData = await PassageiroService.listarPassageiros();
        setPassageiros(passageirosData);
        
        const voosData = await VooService.buscarTodos();
        setVoos(voosData);
      } catch (error) {
        setErro('Erro ao carregar dados');
      }
    };
    
    carregarDados();
    
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!formData.idPassageiro || !formData.idVoo) {
      setErro('Por favor, selecione o passageiro e o voo.');
      return;
    }

    try {
      await ReservaService.salvar({
        idPassageiro: parseInt(formData.idPassageiro),
        idVoo: parseInt(formData.idVoo),
        dataReserva: new Date().toISOString()
      });
      
      history.push('/reservas');
    } catch (error) {
      setErro('Erro ao fazer reserva: ' + error.message);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Reservar Voo</h1>
      
      {erro && <div style={{ color: 'red', marginBottom: '15px' }}>{erro}</div>}
      
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Data e Hora Atual:</Label>
          <Input
            type="text"
            value={dataHoraAtual}
            readOnly
            style={{ backgroundColor: '#f5f5f5' }}
          />
        </FormGroup>
        
        <ComboBoxContainer>
          <ComboBoxLabel>Passageiro:</ComboBoxLabel>
          <ComboBox
            name="idPassageiro"
            value={formData.idPassageiro}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um passageiro</option>
            {passageiros.map(passageiro => (
              <option key={passageiro.id} value={passageiro.id}>
                {passageiro.nome} - {passageiro.cpf}
              </option>
            ))}
          </ComboBox>
        </ComboBoxContainer>
        
        <ComboBoxContainer>
          <ComboBoxLabel>Voo:</ComboBoxLabel>
          <ComboBox
            name="idVoo"
            value={formData.idVoo}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um voo</option>
            {voos.map(voo => (
              <option key={voo.id} value={voo.id}>
                {voo.origem} → {voo.chegada} - {new Date(voo.dataVoo).toLocaleDateString()}
              </option>
            ))}
          </ComboBox>
        </ComboBoxContainer>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <Button primary type="submit">
            Reservar
          </Button>
          <Button onClick={() => history.goBack()}>
            Voltar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReservaForm;