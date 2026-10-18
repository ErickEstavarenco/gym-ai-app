import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import aiRoutes from './routes/aiRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { testConnection } from './config/database.js';
import './models/User.js';
import './models/Workout.js';
import './models/Diet.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origem não permitida → ${origin}`));
  },
  credentials: true,
}));

app.use(express.json());

app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor rodando', env: process.env.NODE_ENV });
});

app.use((req, res) => {
  res.status(404).json({ error: `Rota não encontrada: ${req.method} ${req.path}` });
});

app.use((err, req, res, next) => {
  console.error('💥 Erro:', err);
  res.status(500).json({ error: err.message || 'Erro interno' });
});

const startServer = async () => {
  let dbConnected = false;
  try {
    await testConnection();
    const { sequelize } = await import('./config/database.js');
    await sequelize.sync({ alter: false });
    console.log('📦 Modelos sincronizados');
    dbConnected = true;
  } catch (error) {
    console.warn('⚠️  Banco indisponível:', error.message);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`🌍 Origens permitidas: ${allowedOrigins.join(', ')}`);
    if (!dbConnected) console.log('💾 Modo sem banco de dados');
  });
};

startServer();