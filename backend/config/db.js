const { Pool } = require("pg");

// URL ATUALIZADA COM A NOVA SENHA DO SUPABASE
const connectionString = "postgresql://postgres.uieikytqvsjxlpndbtaa:GymAI@2026!@aws-1-us-east-2.pooler.supabase.com:6543/postgres?sslmode=require";

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// TESTE DE CONEXÃO PARA O LOG DO RENDER
pool.connect((err, client, release) => {
  if (err) {
    return console.error('ERRO CRÍTICO AO CONECTAR AO SUPABASE:', err.stack);
  }
  console.log('CONEXÃO COM SUPABASE ESTABELECIDA COM SUCESSO! 🚀');
  release();
});

module.exports = pool;
