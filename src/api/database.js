import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'wagnerweinert.com.br',
  user: 'info23_DAVI',
  password: 'info23_DAVI',
  database: 'info23_DAVI'
};

export async function getConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Conexão estabelecida com sucesso.');
    return connection;
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error.message);
    throw error;
  }
}

export async function closeConnection(connection) {
  if (connection) {
    try {
      await connection.end();
      console.log('Conexão fechada com sucesso.');
    } catch (error) {
      console.error('Erro ao fechar a conexão:', error.message);
    }
  }
}