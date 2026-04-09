const { Pool } = require("pg");

// URL COM A SENHA NOVA E SSL CONFIGURADO
const connectionString = "postgresql://postgres.uieikytqvsjxlpndbtaa:GymAI@2026!@aws-1-us-east-2.pooler.supabase.com:6543/postgres?sslmode=require";

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    // ESTA É A CHAVE: Ignora a validação de certificado auto-assinado em produção
    rejectUnauthorized: false 
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// TESTE DE CONEXÃO COM LOG DETALHADO
pool.connect((err, client, release) => {
  if (err) {
    return console.error('ERRO AO CONECTAR AO SUPABASE:', err.message);
  }
  console.log('CONEXÃO COM SUPABASE ESTABELECIDA COM SUCESSO! 🚀');
  release();
});

module.exports = pool;
