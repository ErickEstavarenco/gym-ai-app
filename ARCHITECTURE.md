# 🏗️ Arquitetura do Gym AI App

## Diagrama de Fluxo

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React + Vite)                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    App.jsx (Router)                      │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │ AuthProvider (Login/Register/Logout)              │  │   │
│  │  │ WorkoutProvider (Treinos/Dietas)                  ���  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                      Páginas                             │   │
│  │  ├─ Home.jsx (Dashboard)                                │   │
│  │  ├─ Chat.jsx (Chat completo)                            │   │
│  │  ├─ Diet.jsx (Plano alimentar)                          │   │
│  │  ├─ ActiveWorkout.jsx (Execução)                        │   │
│  │  ├─ Stats.jsx (Estatísticas)                            │   │
│  │  ├─ Profile.jsx (Perfil)                                │   │
│  │  ├─ Login.jsx (Autenticação)                            │   │
│  │  ├─ Register.jsx (Cadastro)                             │   │
│  ���  └─ ForgotPassword.jsx (Recuperação)                    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Componentes                           │   │
│  │  ├─ ChatBot.jsx (Flutuante)                             │   │
│  │  └─ Navbar.jsx (Navegação)                              │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                      Hooks                               │   │
���  │  └─ useAI.js (Gerencia IA)                              │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Serviços                              │   │
│  │  └─ aiService.js (Cliente HTTP)                         │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓ (Axios)
┌────────────────────────────────────────────────────────���────────┐
│                    BACKEND (Express + Node.js)                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    server.js                             │   │
│  │  ├─ CORS habilitado                                      │   │
│  │  ├─ Middleware JSON                                      │   │
│  │  └─ Rotas registradas                                    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                      Rotas                               │   │
│  │  ├─ /api/ai/generate-workout                            │   │
│  │  ├─ /api/ai/generate-diet                               │   │
│  │  ├─ /api/ai/chat                                        │   │
│  │  ├─ /api/auth/register                                  │   │
│  │  ├─ /api/auth/login                                     │   │
│  │  └─ /api/auth/profile                                   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Serviços                              │   │
│  │  └─ aiService.js (OpenAI Integration)                   │   │
│  │     ├─ generateWorkout()                                │   │
│  │     ├─ generateDiet()                                   │   │
│  │     └─ chatWithAI()                                     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓ (HTTP)
┌─────────────────────────────────────────────────────────────────┐
│                      OpenAI API                                  │
│  ├─ GPT-4 Turbo (Geração de treinos/dietas)                    │
│  └─ Chat Completions (Conversas)                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Estrutura de Pastas

```
gym-ai-app-v2/
│
├── src/                              # Frontend React
│   ├── components/
│   │   ├─��� ChatBot.jsx              # Chatbot flutuante
│   │   └── Navbar.jsx               # Navegação inferior
│   │
│   ├── context/
│   │   ├── AuthContext.jsx          # Autenticação
│   │   └── WorkoutContext.jsx       # Estado de treinos/dietas
│   │
│   ├── hooks/
│   │   └── useAI.js                 # Hook para IA
│   │
│   ├── pages/
│   │   ├── Home.jsx                 # Dashboard
│   │   ├── Chat.jsx                 # Chat completo
│   │   ├── Diet.jsx                 # Plano alimentar
│   │   ├── ActiveWorkout.jsx        # Execução de treino
│   │   ├── Stats.jsx                # Estatísticas
│   │   ├── Profile.jsx              # Perfil do usuário
│   │   ├── Login.jsx                # Login
│   │   ├── Register.jsx             # Registro
│   │   └── ForgotPassword.jsx       # Recuperação de senha
│   │
│   ├── services/
│   │   └── aiService.js             # Cliente HTTP para IA
│   │
│   ├── utils/                       # Utilitários
│   ├── data/
│   │   └── exercises.js             # Banco de dados de exercícios
│   │
│   ├── App.jsx                      # Componente raiz
│   ├── main.jsx                     # Entry point
│   ├── App.css                      # Estilos globais
│   └── index.css                    # Tailwind imports
│
├── backend/                          # Backend Node.js
│   ├── routes/
│   │   ├── aiRoutes.js              # Rotas de IA
│   │   └── authRoutes.js            # Rotas de autenticação
│   │
│   ├── services/
│   │   └── aiService.js             # Integração OpenAI
│   │
│   ├── middleware/                  # Middlewares (futuro)
│   ├── config/                      # Configurações (futuro)
│   ├── controllers/                 # Controllers (futuro)
│   │
│   ├── server.js                    # Servidor Express
│   ├── package.json                 # Dependências
│   ├── .env.example                 # Variáveis de exemplo
│   └── .gitignore                   # Git ignore
│
├── public/                          # Assets estáticos
├── index.html                       # HTML principal
├── package.json                     # Dependências frontend
├── vite.config.js                   # Configuração Vite
├── tailwind.config.js               # Configuração Tailwind
├── postcss.config.js                # Configuração PostCSS
│
├── SETUP.md                         # Guia de instalação
├── PROMPTS.md                       # Exemplos de prompts
├── CONFIG.md                        # Configuração de desenvolvimento
├── CHECKLIST.md                     # Checklist de implementação
└── README.md                        # Este arquivo
```

---

## Fluxo de Dados

### 1. Geração de Treino

```
Usuário digita no Chat
    ↓
ChatBot.jsx captura input
    ↓
useAI.sendMessage() é chamado
    ↓
aiService.generateWorkout() faz POST
    ↓
Backend: POST /api/ai/generate-workout
    ↓
aiService.js (backend) chama OpenAI
    ↓
OpenAI retorna JSON com treino
    ↓
Backend retorna JSON ao frontend
    ↓
Frontend faz parse e exibe
    ↓
Usuário clica "Salvar"
    ↓
WorkoutContext.saveWorkout() salva em estado
    ↓
Treino aparece em Home.jsx
```

### 2. Autenticação

```
Usuário vai para /login
    ↓
Preenche email e senha
    ↓
Login.jsx chama useAuth().login()
    ↓
AuthContext faz POST /api/auth/login
    ↓
Backend valida credenciais
    ↓
Backend retorna token JWT
    ↓
Token é salvo em localStorage
    ↓
Usuário é redirecionado para /
    ↓
PrivateRoute verifica token
    ↓
Acesso concedido
```

### 3. Chat com IA

```
Usuário envia mensagem
    ↓
ChatBot.jsx captura input
    ↓
useAI.sendMessage() é chamado
    ↓
aiService.chatWithAI() faz POST
    ↓
Backend: POST /api/ai/chat
    ↓
Backend envia histórico + nova mensagem
    ↓
OpenAI processa conversa
    ↓
OpenAI retorna resposta
    ↓
Backend retorna resposta ao frontend
    ↓
Frontend exibe mensagem
    ↓
Histórico é atualizado em useAI
```

---

## Componentes Principais

### ChatBot.jsx
```
Props:
  - isOpen: boolean
  - onClose: function

State:
  - messages: array
  - inputValue: string
  - isTyping: boolean
  - context: string

Hooks:
  - useAI()
  - useWorkout()
  - useRef (scroll)
  - useEffect (scroll to bottom)
```

### Home.jsx
```
Props: None

State:
  - chatOpen: boolean

Hooks:
  - useAuth()
  - useNavigate()
  - useWorkout()

Componentes:
  - ChatBot (flutuante)
  - Navbar
```

### Chat.jsx
```
Props: None

State:
  - messages: array
  - inputValue: string
  - isTyping: boolean

Hooks:
  - useNavigate()
  - useRef (scroll)
  - useEffect (scroll to bottom)

Componentes:
  - Navbar
```

---

## Contextos

### AuthContext
```
Valores:
  - user: object
  - token: string
  - loading: boolean
  - api: axios instance

Funções:
  - login(email, password)
  - register(name, email, password)
  - logout()
```

### WorkoutContext
```
Valores:
  - currentWorkout: object
  - savedWorkouts: array
  - currentDiet: object
  - savedDiets: array
  - userProfile: object

Funções:
  - saveWorkout(workout)
  - deleteWorkout(id)
  - updateWorkout(id, updates)
  - setActiveWorkout(id)
  - saveDiet(diet)
  - deleteDiet(id)
  - updateDiet(id, updates)
  - setActiveDiet(id)
  - updateUserProfile(updates)
```

---

## Hooks

### useAI
```
Retorna:
  - loading: boolean
  - error: string
  - conversationHistory: array
  - sendMessage(message): Promise
  - generateNewWorkout(userProfile): Promise
  - generateNewDiet(userProfile): Promise
  - clearHistory(): void
```

---

## Endpoints da API

### IA

#### POST /api/ai/generate-workout
```
Request:
{
  "userProfile": {
    "objective": "hipertrofia",
    "level": "intermediário",
    "daysPerWeek": 4,
    "sessionDuration": 60,
    "equipment": ["barra", "halteres"],
    "restrictions": []
  }
}

Response:
{
  "title": "Plano de Hipertrofia",
  "description": "...",
  "days": [...],
  "nutrition": {...},
  "tips": [...]
}
```

#### POST /api/ai/generate-diet
```
Request:
{
  "userProfile": {
    "objective": "ganho_massa",
    "dailyCalories": 2800,
    "mealsPerDay": 5,
    "restrictions": []
  }
}

Response:
{
  "title": "Plano Alimentar",
  "objective": "ganho_massa",
  "meals": [...],
  "macros": {...},
  "tips": [...]
}
```

#### POST /api/ai/chat
```
Request:
{
  "message": "Quero criar um treino",
  "conversationHistory": [
    {"role": "user", "content": "..."},
    {"role": "assistant", "content": "..."}
  ]
}

Response:
{
  "response": "Resposta da IA..."
}
```

### Autenticação

#### POST /api/auth/register
```
Request:
{
  "name": "João",
  "email": "joao@email.com",
  "password": "senha123"
}

Response:
{
  "token": "jwt_token",
  "user": {
    "id": 1,
    "name": "João",
    "email": "joao@email.com"
  }
}
```

#### POST /api/auth/login
```
Request:
{
  "email": "joao@email.com",
  "password": "senha123"
}

Response:
{
  "token": "jwt_token",
  "user": {
    "id": 1,
    "name": "João",
    "email": "joao@email.com"
  }
}
```

#### GET /api/auth/profile
```
Headers:
  x-auth-token: jwt_token

Response:
{
  "id": 1,
  "name": "João",
  "email": "joao@email.com"
}
```

---

## Tecnologias

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animações
- **Lucide React** - Ícones
- **React Router** - Roteamento
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **OpenAI** - IA API
- **JWT** - Autenticação
- **CORS** - Cross-origin requests

### Ferramentas
- **Git** - Versionamento
- **npm** - Package manager
- **Vite** - Dev server

---

## Fluxo de Desenvolvimento

```
1. Usuário acessa app
   ↓
2. Se não autenticado → Login/Register
   ↓
3. Se autenticado → Home
   ↓
4. Usuário clica em Chat
   ↓
5. ChatBot abre (flutuante ou página)
   ↓
6. Usuário digita mensagem
   ↓
7. Frontend envia para backend
   ↓
8. Backend processa com IA
   ↓
9. Backend retorna resposta
   ↓
10. Frontend exibe resposta
    ↓
11. Usuário pode salvar treino/dieta
    ↓
12. Dados são salvos em estado (futuro: banco de dados)
    ↓
13. Usuário acessa treino/dieta em outras páginas
```

---

## Próximas Melhorias

- [ ] Banco de dados (MongoDB/PostgreSQL)
- [ ] Autenticação real com OAuth
- [ ] Histórico persistente
- [ ] Sincronização em tempo real
- [ ] Modo offline
- [ ] Notificações push
- [ ] Análise de progresso com gráficos
- [ ] Integração com wearables
- [ ] Comunidade/Social features

---

**Última atualização:** 2024
