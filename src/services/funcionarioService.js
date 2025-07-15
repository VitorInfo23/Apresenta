import { getConnection, closeConnection } from '../api/database';

export const FuncionarioService = {
  async buscarPorCpf(cpf) {
    const conn = await getConnection();
    try {
      const sql = 'SELECT * FROM Funcionario WHERE cpf = ?';
      const [rows] = await conn.execute(sql, [cpf]);
      return rows[0] || null;
    } finally {
      await closeConnection(conn);
    }
  }
};