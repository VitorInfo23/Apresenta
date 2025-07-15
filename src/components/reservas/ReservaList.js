import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../layout';
import { Table, TableHeader, TableHeaderCell, TableRow, TableCell, TableActionCell } from '../layout/Table';
import { ReservaService } from '../../services';

const ReservaList = () => {
  const [reservas, setReservas] = useState([]);
  const [busca, setBusca] = useState('');
  const [erro, setErro] = useState('');
  const history = useHistory();

  useEffect(() => {
    const carregarReservas = async () => {
      try {
        const data = await ReservaService.buscarTodas();
        setReservas(data);
      } catch (error) {
        setErro('Erro ao carregar reservas');
      }
    };
    
    carregarReservas();
  }, []);

  const handleBuscar = async () => {
    try {
      const data = await ReservaService.buscarReservas(busca);
      setReservas(data);
    } catch (error) {
      setErro('Erro ao buscar reservas');
    }
  };

  const handleCancelar = async (id) => {
    if (window.confirm('Tem certeza que deseja cancelar esta reserva?')) {
      try {
        await ReservaService.remover(id);
        setReservas(reservas.filter(reserva => reserva.id !== id));
      } catch (error) {
        setErro('Erro ao cancelar reserva');
      }
    }
  };

  return (
    <div>
      <h1>Lista de Reservas</h1>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Pesquisar reservas"
          style={{ padding: '10px', flex: 1, borderRadius: '8px', border: '1px solid #1e88e5' }}
        />
        <Button primary onClick={handleBuscar}>Pesquisar</Button>
      </div>
      
      {erro && <div style={{ color: 'red', marginBottom: '15px' }}>{erro}</div>}
      
      {reservas.length === 0 ? (
        <p>Nenhuma reserva encontrada</p>
      ) : (
        <Table>
          <TableHeader>
            <tr>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>Passageiro</TableHeaderCell>
              <TableHeaderCell>CPF</TableHeaderCell>
              <TableHeaderCell>Voo</TableHeaderCell>
              <TableHeaderCell>Data da Reserva</TableHeaderCell>
              <TableHeaderCell>Ações</TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody>
            {reservas.map(reserva => (
              <TableRow key={reserva.id}>
                <TableCell>{reserva.id}</TableCell>
                <TableCell>{reserva.nomePassageiro}</TableCell>
                <TableCell>{reserva.cpfPassageiro}</TableCell>
                <TableCell>{reserva.origem} → {reserva.chegada}</TableCell>
                <TableCell>{new Date(reserva.dataReserva).toLocaleString()}</TableCell>
                <TableActionCell>
                  <Button onClick={() => handleCancelar(reserva.id)}>Cancelar</Button>
                </TableActionCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Button onClick={() => history.goBack()}>Voltar</Button>
      </div>
    </div>
  );
};

export default ReservaList;