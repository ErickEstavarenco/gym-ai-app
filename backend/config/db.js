const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Log para confirmar conexão no Render
pool.connect((err, client, release) => {
  if (err) {
    return console.error('ERRO AO CONECTAR AO SUPABASE:', err.stack);
  }
  console.log('CONEXÃO COM SUPABASE ESTABELECIDA COM SUCESSO! 🚀');
  release();
});

module.exports = pool;
