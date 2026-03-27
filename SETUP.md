# Gym AI App - Guia de Setup

Aplicativo de academia com chatbot IA que cria treinos e planos alimentares personalizados.

## 📋 Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn
- Chave de API OpenAI (https://platform.openai.com/api-keys)

## 🚀 Setup Rápido

### 1. Frontend (Vite + React)

```bash
# Na raiz do projeto
npm install
npm run dev
```

O frontend rodará em `http://localhost:5173`

### 2. Backend (Express + OpenAI)

```bash
# Entrar na pasta backend
cd backend

# Instalar dependências
npm install

# Criar arquivo .env
cp .env.example .env

# Editar .env e adicionar sua chave OpenAI
# OPENAI_API_KEY=sk-...

# Rodar servidor
npm run dev
```

O backend rodará em `http://localhost:5000`

## 🔑 Configuração OpenAI

1. Acesse https://platform.openai.com/api-keys
2. Crie uma nova chave de API
3. Copie a chave e adicione ao arquivo `.env` do backend:
   ```
   OPENAI_API_KEY=sk-seu-token-aqui
   ```

## 📁 Estrutura do Projeto

```
gym-ai-app-v2/
├── src/                          # Frontend React
│   ├── components/
│   │   ├── ChatBot.jsx          # Chatbot integrado com IA
│   │   └── Navbar.jsx
│   ├── context/
│   │   ├── AuthContext.jsx      # Autenticação
│   │   └── WorkoutContext.jsx   # Estado de treinos/dietas
│   ├── hooks/
│   │   └── useAI.js             # Hook para IA
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Chat.jsx
│   │   ├── Diet.jsx
│   │   ├── ActiveWorkout.jsx
│   │   ├── Stats.jsx
│   │   ├── Profile.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── ForgotPassword.jsx
│   ├── services/
│   │   └── aiService.js         # Cliente HTTP para IA
│   └── App.jsx
│
├── backend/                      # Backend Node.js
│   ├── routes/
│   │   ├── aiRoutes.js          # Rotas de IA
│   │   └── authRoutes.js        # Rotas de autenticação
│   ├── services/
│   │   └── aiService.js         # Integração OpenAI
│   ├── server.js                # Servidor Express
│   ├── package.json
│   └── .env.example
│
└── package.json
```

## 🎯 Funcionalidades Principais

### 1. **Chatbot IA**
- Conversa natural com assistente de treino
- Gera treinos personalizados
- Cria planos alimentares
- Fornece motivação e dicas

### 2. **Geração de Treinos**
- Treinos por objetivo (hipertrofia, emagrecimento, força)
- Adaptado ao nível (iniciante, intermediário, avançado)
- Customizável por dias/semana e duração
- Inclui exercícios, séries, repetições e tempos de descanso

### 3. **Planos Alimentares**
- Dietas personalizadas por objetivo
- Cálculo de macronutrientes
- Sugestões de refeições
- Alternativas de alimentos

### 4. **Autenticação**
- Login/Registro de usuários
- Recuperação de senha
- Proteção de rotas privadas

### 5. **Perfil e Estatísticas**
- Histórico de treinos
- Progresso e estatísticas
- Configurações de preferências

## 🔌 Endpoints da API

### IA
- `POST /api/ai/generate-workout` - Gera treino
- `POST /api/ai/generate-diet` - Gera dieta
- `POST /api/ai/chat` - Chat genérico

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/profile` - Obter perfil

## 📝 Exemplo de Uso

### Gerar Treino via API

```bash
curl -X POST http://localhost:5000/api/ai/generate-workout \
  -H "Content-Type: application/json" \
  -d '{
    "userProfile": {
      "objective": "hipertrofia",
      "level": "intermediário",
      "daysPerWeek": 4,
      "sessionDuration": 60,
      "equipment": ["barra", "halteres", "máquinas"]
    }
  }'
```

### Resposta Esperada

```json
{
  "title": "Plano de Hipertrofia 4 Dias",
  "description": "Focado em ganho de massa muscular",
  "objective": "hipertrofia",
  "level": "intermediário",
  "daysPerWeek": 4,
  "days": [
    {
      "day": "Segunda",
      "focus": "Peito & Tríceps",
      "duration": 60,
      "exercises": [
        {
          "name": "Supino Reto",
          "sets": 4,
          "reps": "8-12",
          "restSeconds": 90,
          "tempo": "3-1-1",
          "notes": "Controle o movimento"
        }
      ]
    }
  ]
}
```

## 🎨 Tema e Cores

- **Cor Primária**: `#FF4D00` (Laranja)
- **Cor Secundária**: `#FF6B00` (Laranja Escuro)
- **Fundo**: `#0D0D0D` (Preto)
- **Cards**: `#1A1A1A` (Cinza Escuro)

## 🛠️ Tecnologias Utilizadas

### Frontend
- React 19
- Vite
- Tailwind CSS
- Framer Motion (animações)
- Lucide React (ícones)
- React Router
- Axios

### Backend
- Node.js
- Express
- OpenAI API
- JWT (autenticação)
- CORS

## 📱 Modo Desenvolvimento

O app inclui `DEV_MODE` no AuthContext para testar sem backend:

```javascript
const DEV_MODE = true; // Mude para false para usar backend real
```

## 🚨 Troubleshooting

### Erro: "Cannot find module 'openai'"
```bash
cd backend
npm install openai
```

### Erro: "CORS error"
Certifique-se de que o backend está rodando em `http://localhost:5000`

### Erro: "Invalid API Key"
Verifique se sua chave OpenAI está correta no arquivo `.env`

### Erro: "Port 5000 already in use"
```bash
# Mude a porta no backend/server.js
const PORT = process.env.PORT || 5001;
```

## 📚 Documentação Adicional

- [OpenAI API Docs](https://platform.openai.com/docs)
- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)
- [Tailwind CSS](https://tailwindcss.com)

## 📄 Licença

MIT

## 👨‍💻 Autor

Desenvolvido para Gym AI App v2

---

**Próximos Passos:**
1. Configurar banco de dados (MongoDB/PostgreSQL)
2. Implementar autenticação real com JWT
3. Adicionar histórico persistente de treinos/dietas
4. Implementar sistema de pagamento
5. Deploy em produção
