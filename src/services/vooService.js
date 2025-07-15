import { getConnection, closeConnection } from '../api/database';

export const VooService = {
  async salvar(voo) {
    const conn = await getConnection();
    try {
      const sql = `INSERT INTO Voo 
                  (localPartida, localChegada, dataVoo, horaPartida, horaChegada, capacidadePassageiros, valorPassagem) 
                  VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const values = [
        voo.origem,
        voo.chegada,
        voo.dataVoo,
        voo.horaPartida,
        voo.horaChegada,
        voo.capacidadePassageiros,
        voo.valorPassagem
      ];
      
      const [result] = await conn.execute(sql, values);
      return result.insertId;
    } finally {
      await closeConnection(conn);
    }
  },

  async buscarTodos() {
    const conn = await getConnection();
    try {
      const sql = 'SELECT * FROM Voo';
      const [rows] = await conn.execute(sql);
      return rows;
    } finally {
      await closeConnection(conn);
    }
  },

  async buscarPorId(id) {
    const conn = await getConnection();
    try {
      const sql = 'SELECT * FROM Voo WHERE id = ?';
      const [rows] = await conn.execute(sql, [id]);
      return rows[0] || null;
    } finally {
      await closeConnection(conn);
    }
  },

  async atualizar(voo) {
    const conn = await getConnection();
    try {
      const sql = `UPDATE Voo 
                  SET localPartida = ?, localChegada = ?, dataVoo = ?, 
                      horaPartida = ?, horaChegada = ?, capacidadePassageiros = ?, valorPassagem = ? 
                  WHERE id = ?`;
      const values = [
        voo.origem,
        voo.chegada,
        voo.dataVoo,
        voo.horaPartida,
        voo.horaChegada,
        voo.capacidadePassageiros,
        voo.valorPassagem,
        voo.id
      ];
      
      await conn.execute(sql, values);
    } finally {
      await closeConnection(conn);
    }
  },

  async remover(id) {
    const conn = await getConnection();
    try {
      const sql = 'DELETE FROM Voo WHERE id = ?';
      await conn.execute(sql, [id]);
    } finally {
      await closeConnection(conn);
    }
  }
};