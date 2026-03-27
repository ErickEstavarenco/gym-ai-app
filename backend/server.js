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
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Permitir requests sem origin (como mobile apps) ou localhost com qualquer porta
    if (!origin || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Rotas
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor rodando' });
});

// Erro 404
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Iniciar servidor com conexão ao DB
const startServer = async () => {
  let dbConnected = false;
  
  try {
    await testConnection();
    await import('./config/database.js').then(async (mod) => {
      const { sequelize } = mod;
      await sequelize.sync();
      console.log('📦 Modelos sincronizados no banco de dados');
    });
    dbConnected = true;
  } catch (error) {
    console.warn('⚠️ Banco de dados não disponível. Rodando em modo DEV sem persistência:', error.message);
    dbConnected = false;
  }

  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📡 CORS habilitado para http://localhost:5173`);
    if (!dbConnected) {
      console.log('💾 Modo desenvolvimento: sem conexão com banco de dados');
    }
  });
};

startServer();
