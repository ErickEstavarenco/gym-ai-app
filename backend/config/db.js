const { Pool } = require("pg");

// URL COMPLETA
const connectionString = "postgresql://postgres.uieikytqvsjxlpndbtaa:GymAI@2026!@aws-1-us-east-2.pooler.supabase.com:6543/postgres";

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    // FORÇANDO A ACEITAÇÃO DO CERTIFICADO
    rejectUnauthorized: false
  }
});

// TESTE DE CONEXÃO COM LOGS MAIS FORTES
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ ERRO DE CONEXÃO:', err.message);
  } else {
    console.log('✅ BANCO CONECTADO COM SUCESSO EM:', res.rows[0].now);
  }
});

module.exports = pool;
