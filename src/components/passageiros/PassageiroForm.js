import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, FormGroup, Label, Input, DatePicker } from '../layout';
import { PassageiroService } from '../../services/passageiroService';
import { isValidCpf, isValidTelefone } from '../../utils/validators';

const PassageiroForm = () => {
  const history = useHistory();
  const { cpf } = useParams();
  const [passageiro, setPassageiro] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    nascimento: ''
  });
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (cpf) {
      const carregarPassageiro = async () => {
        try {
          const data = await PassageiroService.buscarPorCpf(cpf);
          if (data) {
            setPassageiro({
              ...data,
              nascimento: data.nascimento.split('T')[0] // Formatar data
            });
          }
        } catch (error) {
          setErro('Erro ao carregar passageiro');
        }
      };
      carregarPassageiro();
    }
  }, [cpf]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassageiro({ ...passageiro, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    // Validações
    if (!isValidCpf(passageiro.cpf)) {
      setErro('O CPF deve ter exatamente 11 dígitos e conter apenas números.');
      return;
    }

    if (!isValidTelefone(passageiro.telefone)) {
      setErro('O telefone deve ter exatamente 11 dígitos e conter apenas números.');
      return;
    }

    try {
      if (cpf) {
        await PassageiroService.atualizar(passageiro);
      } else {
        // Verificar se CPF já existe
        const existente = await PassageiroService.buscarPorCpf(passageiro.cpf);
        if (existente) {
          setErro('Já existe um passageiro cadastrado com este CPF.');
          return;
        }
        
        await PassageiroService.salvar(passageiro);
      }
      history.push('/passageiros');
    } catch (error) {
      setErro('Erro ao salvar passageiro');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>{cpf ? 'Editar Passageiro' : 'Cadastrar Passageiro'}</h1>
      
      {erro && <div style={{ color: 'red', marginBottom: '15px' }}>{erro}</div>}
      
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nome:</Label>
          <Input
            name="nome"
            value={passageiro.nome}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label>CPF:</Label>
          <Input
            name="cpf"
            value={passageiro.cpf}
            onChange={handleChange}
            required
            disabled={!!cpf}
          />
        </FormGroup>
        
        <FormGroup>
          <Label>E-mail:</Label>
          <Input
            name="email"
            type="email"
            value={passageiro.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Telefone:</Label>
          <Input
            name="telefone"
            value={passageiro.telefone}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Data de Nascimento:</Label>
          <DatePicker
            name="nascimento"
            value={passageiro.nascimento}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <Button primary type="submit">
            {cpf ? 'Atualizar' : 'Salvar'}
          </Button>
          <Button onClick={() => history.goBack()}>
            Voltar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PassageiroForm;