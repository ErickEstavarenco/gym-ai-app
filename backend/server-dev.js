simport express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors({
origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true

}));
app.use(express.json());

// Mock user for testing
const mockUser = {
  id: 1,
  name: 'Usuário Teste',
  email: 'teste@gmail.com',
  token: 'mock_token_12345'
};

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor rodando em modo DEV' });
});

// Mock auth endpoints
app.post('/api/auth/login', (req, res) => {
  res.json({
    user: mockUser,
    token: mockUser.token
  });
});

app.post('/api/auth/register', (req, res) => {
  res.json({
    user: mockUser,
    token: mockUser.token
  });
});

app.get('/api/auth/me', (req, res) => {
  res.json({
    user: mockUser
  });
});

// Mock AI routes
app.post('/api/ai/chat', (req, res) => {
  res.json({
    response: 'Isso é uma resposta mock do servidor de desenvolvimento. Conecte um backend real para funcionalidades completas.'
  });
});

app.get('/api/ai/latest-plan/:userId', (req, res) => {
  res.json({
    latestWorkout: null,
    latestDiet: null
  });
});

app.post('/api/ai/save-plan', (req, res) => {
  res.json({
    success: true,
    message: 'Plano salvo (modo DEV - sem persistência)'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor DEV rodando em http://localhost:${PORT}`);
  console.log(`📡 CORS habilitado para http://localhost:5174`);
  console.log(`💾 Modo desenvolvimento: sem conexão com banco de dados`);
  console.log(`⚠️ Todos os endpoints são mocks para testes!`);
});
