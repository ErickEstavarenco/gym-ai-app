const { Pool } = require("pg");

const connectionString = "postgresql://postgres.uieikytqvsjxlpndbtaa:GymAI@2026!@aws-1-us-east-2.pooler.supabase.com:6543/postgres?sslmode=no-verify";

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

// Forçar a conexão imediata
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ ERRO AO CONECTAR:', err.message);
  } else {
    console.log('✅ CONEXÃO ESTABELECIDA EM:', res.rows[0].now);
  }
});

module.exports = pool;
