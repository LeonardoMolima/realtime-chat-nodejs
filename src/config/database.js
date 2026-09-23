const { Pool } = require('pg');
require('dotenv').config(); //variáveis do .env

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

//Teste de conexão para quando o servidor ligar
pool.connect((err, client, release) => {
  if (err) {
    return console.error('[database] Erro ao conectar ao PostgreSQL:', err.stack);
  }
  console.log('[database] Conectado ao banco de dados com sucesso!');
  release(); //Libera o cliente de volta pro pool
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
