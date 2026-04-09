const { Pool } = require("pg");

// URL DIRETA DO SUPABASE (PORTA 5432) - MAIS ESTÁVEL
const connectionString = "postgresql://postgres.uieikytqvsjxlpndbtaa:GymAI@2026!@aws-1-us-east-2.pooler.supabase.com:5432/postgres";

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

// Teste de conexão forçado com resposta imediata no log
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ ERRO CRÍTICO NO BANCO:', err.message);
  } else {
    console.log('✅ BANCO DE DADOS CONECTADO COM SUCESSO! 🚀');
  }
});

module.exports = pool;
