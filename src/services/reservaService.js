import { getConnection, closeConnection } from '../api/database';

export const ReservaService = {
  async salvar(reserva) {
    const conn = await getConnection();
    try {
      const sql = `INSERT INTO Reserva (idPassageiro, idVoo, dataReserva) VALUES (?, ?, ?)`;
      const values = [
        reserva.idPassageiro,
        reserva.idVoo,
        reserva.dataReserva
      ];
      
      const [result] = await conn.execute(sql, values);
      return result.insertId;
    } finally {
      await closeConnection(conn);
    }
  },

  async buscarTodas() {
    const conn = await getConnection();
    try {
      const sql = `
        SELECT 
          r.id, 
          p.nome AS nomePassageiro, 
          p.cpf AS cpfPassageiro,
          v.localPartida AS origem,
          v.localChegada AS chegada,
          r.dataReserva
        FROM Reserva r
        JOIN Passageiro p ON r.idPassageiro = p.id
        JOIN Voo v ON r.idVoo = v.id
      `;
      const [rows] = await conn.execute(sql);
      return rows;
    } finally {
      await closeConnection(conn);
    }
  },

  async buscarReservas(termo) {
    const conn = await getConnection();
    try {
      const sql = `
        SELECT 
          r.id, 
          p.nome AS nomePassageiro, 
          p.cpf AS cpfPassageiro,
          v.localPartida AS origem,
          v.localChegada AS chegada,
          r.dataReserva
        FROM Reserva r
        JOIN Passageiro p ON r.idPassageiro = p.id
        JOIN Voo v ON r.idVoo = v.id
        WHERE p.nome LIKE ? OR p.cpf LIKE ? OR v.localPartida LIKE ? OR v.localChegada LIKE ?
      `;
      const [rows] = await conn.execute(sql, [
        `%${termo}%`,
        `%${termo}%`,
        `%${termo}%`,
        `%${termo}%`
      ]);
      return rows;
    } finally {
      await closeConnection(conn);
    }
  },

  async remover(id) {
    const conn = await getConnection();
    try {
      const sql = 'DELETE FROM Reserva WHERE id = ?';
      await conn.execute(sql, [id]);
    } finally {
      await closeConnection(conn);
    }
  }
};