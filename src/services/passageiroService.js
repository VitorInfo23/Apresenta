import { getConnection, closeConnection } from '../api/database';

export const PassageiroService = {
  async salvar(passageiro) {
    const conn = await getConnection();
    try {
      const sql = `INSERT INTO Passageiro (nome, cpf, email, telefone, nascimento) 
                   VALUES (?, ?, ?, ?, ?)`;
      const values = [
        passageiro.nome,
        passageiro.cpf,
        passageiro.email,
        passageiro.telefone,
        passageiro.nascimento
      ];
      
      const [result] = await conn.execute(sql, values);
      return result.insertId;
    } finally {
      await closeConnection(conn);
    }
  },

  async buscarPorCpf(cpf) {
    const conn = await getConnection();
    try {
      const sql = 'SELECT * FROM Passageiro WHERE cpf = ?';
      const [rows] = await conn.execute(sql, [cpf]);
      return rows[0] || null;
    } finally {
      await closeConnection(conn);
    }
  },

  async listarPassageiros() {
    const conn = await getConnection();
    try {
      const sql = 'SELECT * FROM Passageiro';
      const [rows] = await conn.execute(sql);
      return rows;
    } finally {
      await closeConnection(conn);
    }
  },

  async atualizar(passageiro) {
    const conn = await getConnection();
    try {
      const sql = `UPDATE Passageiro 
                  SET nome = ?, email = ?, telefone = ?, nascimento = ? 
                  WHERE cpf = ?`;
      const values = [
        passageiro.nome,
        passageiro.email,
        passageiro.telefone,
        passageiro.nascimento,
        passageiro.cpf
      ];
      
      await conn.execute(sql, values);
    } finally {
      await closeConnection(conn);
    }
  },

  async remover(cpf) {
    const conn = await getConnection();
    try {
      const sql = 'DELETE FROM Passageiro WHERE cpf = ?';
      await conn.execute(sql, [cpf]);
    } finally {
      await closeConnection(conn);
    }
  }
};