# 🏋️ Gym AI App - Guia Visual

## Fluxo de Uso

```
┌─────────────────────────────────────────────────────────────┐
│                    USUÁRIO ACESSA APP                       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              AUTENTICADO?                                    │
│  ├─ NÃO → Login/Register                                    │
│  └─ SIM → Home                                              │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌──────────��──────────────────────────────────────────────────┐
│                    HOME (Dashboard)                          │
│  ├─ Treinos salvos                                          │
│  ├─ Estatísticas                                            │
│  ├─ Botão Chat (flutuante)                                  │
│  └─ Navbar (navegação)                                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              CLICA NO BOTÃO CHAT                             │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────���──────────┐
│                    CHATBOT ABRE                              │
│  ├─ Histórico de mensagens                                  │
│  ├─ Input de texto                                          │
│  └─ Sugestões rápidas                                       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│          USUÁRIO DIGITA MENSAGEM                             │
│  Ex: "Quero criar um treino para ganhar massa"              │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              FRONTEND ENVIA PARA BACKEND                     │
│  POST /api/ai/chat                                          │
│  {                                                          │
│    "message": "Quero criar um treino...",                   │
│    "conversationHistory": [...]                             │
│  }                                                          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              BACKEND PROCESSA                                │
│  ├─ Recebe mensagem                                         │
│  ├─ Envia para OpenAI                                       │
│  └─ Recebe resposta                                         │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌────────────��────────────────────────────────────────────────┐
│              OPENAI RESPONDE                                 │
│  "Ótimo! Para criar um treino, preciso saber:               │
│   1. Seu nível (iniciante/intermediário/avançado)           │
│   2. Dias por semana                                        │
│   3. Duração da sessão                                      │
│   ..."                                                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              FRONTEND EXIBE RESPOSTA                         │
│  ├─ Mensagem da IA                                          │
│  ├─ Sugestões rápidas                                       │
│  └─ Histórico atualizado                                    │
└──────────────────────────────────��──────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│          USUÁRIO CLICA EM SUGESTÃO                           │
│  Ex: "Intermediário, 4 dias, 60 minutos"                    │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              BACKEND GERA TREINO                             │
│  POST /api/ai/generate-workout                              │
│  {                                                          │
│    "userProfile": {                                         │
│      "objective": "hipertrofia",                            │
│      "level": "intermediário",                              │
│      "daysPerWeek": 4,                                      │
│      ...                                                    │
│    }                                                        │
│  }                                                          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              OPENAI RETORNA TREINO JSON                      │
│  {                                                          │
│    "title": "Plano de Hipertrofia 4 Dias",                  │
│    "days": [                                                │
│      {                                                      │
│        "day": "Segunda",                                    │
│        "focus": "Peito & Tríceps",                          │
│        "exercises": [...]                                   │
│      }                                                      │
│    ]                                                        │
│  }                                                          │
└──��──────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              FRONTEND EXIBE TREINO                           │
│  ├─ Título e descrição                                      │
│  ├─ Dias da semana                                          │
│  ├─ Exercícios com séries/reps                              │
│  └─ Botão "Salvar"                                          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│          USUÁRIO CLICA "SALVAR"                              │
└────────────────────────────────────────���────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              TREINO SALVO                                    │
│  ├─ Armazenado em WorkoutContext                            │
│  ├─ Aparece em Home.jsx                                     │
│  └─ Pode ser acessado em /workout                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Estrutura de Pastas Visual

```
gym-ai-app-v2/
│
├── 📁 src/                          Frontend React
│   ├── 📁 components/
│   │   ├── ChatBot.jsx              ✨ Chatbot com IA
│   │   └── Navbar.jsx               Navegação
│   │
│   ├── 📁 context/
│   │   ├── AuthContext.jsx          🔐 Autenticação
│   │   └── WorkoutContext.jsx       💪 Treinos/Dietas
│   │
│   ├── 📁 hooks/
│   │   └── useAI.js                 🤖 Hook IA
│   │
│   ├── 📁 pages/
│   │   ├── Home.jsx                 🏠 Dashboard
│   │   ├── Chat.jsx                 💬 Chat
│   │   ├── Diet.jsx                 🥗 Dieta
│   │   ├── ActiveWorkout.jsx        ⏱️ Treino
│   │   ├── Stats.jsx                📊 Estatísticas
│   │   ├── Profile.jsx              👤 Perfil
│   │   ├── Login.jsx                🔑 Login
│   │   ├── Register.jsx             📝 Registro
│   │   └── ForgotPassword.jsx       🔄 Recuperação
│   │
│   ├── 📁 services/
│   │   └── aiService.js             🌐 Cliente HTTP
│   │
│   ├── App.jsx                      🎯 App Principal
│   └── main.jsx                     Entry Point
│
├── 📁 backend/                      Backend Node.js
│   ├── 📁 routes/
│   │   ├── aiRoutes.js              🤖 Rotas IA
│   │   └── authRoutes.js            🔐 Rotas Auth
│   │
│   ├── 📁 services/
│   │   └── aiService.js             🧠 OpenAI
│   │
│   ├── server.js                    🚀 Servidor
│   ├── package.json                 📦 Dependências
│   └── .env.example                 ⚙️ Config
│
├── 📄 README.md                     📖 Resumo
├─�� 📄 SETUP.md                      🔧 Instalação
├���─ 📄 ARCHITECTURE.md               🏗️ Arquitetura
├── 📄 CONFIG.md                     ⚙️ Configuração
├── 📄 PROMPTS.md                    💬 Prompts
├── 📄 CHECKLIST.md                  ✅ Checklist
├── 📄 TROUBLESHOOTING.md            🔧 Troubleshooting
└── 📄 IMPLEMENTATION_SUMMARY.md     📋 Sumário
```

---

## Componentes Principais

### ChatBot.jsx
```
┌─────────────────────────────────┐
│  Assistente Gym AI              │ ← Header
├─────────────────────────────────┤
│                                 │
│  Bot: Olá! Como posso ajudar?   │
│                                 │
│  [Criar treino] [Dieta] [...]   │ ← Sugestões
│                                 │
│  User: Quero um treino          │
│                                 │
│  Bot: Ótimo! Qual seu objetivo? │
│                                 │
├─────────────────────────────────┤
│ [Input] [Send]                  │ ← Input
└─────────────────────────────────┘
```

### Home.jsx
```
┌─────────────────────────────────────┐
│  WORKOUT SPLIT                      │ ← Header
├─────────────────────────────────────┤
│                                     │
│  ⚡ AI Recommendation               │
│  "Aumentei volume para Split B"     │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ SPLIT A                     │   │
│  │ PEITO & TRÍCEPS             │   │
│  │ 55 MIN • 8 EXERCÍCIOS       │   │
│  │ [INICIAR]                   │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ SPLIT B                     │   │
│  │ COSTAS & BÍCEPS             │   │
│  │ 62 MIN • 7 EXERCÍCIOS       │   │
│  │ [REFAZER]                   │   │
│  └─────────────────────────────┘   │
│                                     │
│  [Stats] [Streak] [Calories]        │
│                                     │
├─────────────────────────────────────┤
│ 💬 [Chat Button]                    │ ← Chat Flutuante
├─────────────────────────────────────┤
│ [Home] [Chat] [Diet] [Stats] [Menu] │ ← Navbar
└─────────────────────────────────────┘
```

---

## Fluxo de Autenticação

```
┌──────────────────┐
│  Usuário Novo    │
└────────┬─────────┘
         │
         ↓
┌──────────────────────────────┐
│  /register                   │
│  ├─ Nome                     │
│  ├─ Email                    │
│  └─ Senha                    │
└────────┬─────────────────────┘
         │
         ↓
┌──────────────────────────────┐
│  Backend: POST /auth/register│
│  ├─ Validar dados            │
│  ├─ Criar usuário            │
│  └─ Gerar JWT                │
└────────┬─────────────────────┘
         │
         ↓
┌──────────────────────────────┐
│  Frontend: Salvar token      │
│  ├─ localStorage.setItem()   │
│  └─ Redirecionar para /      │
└────────┬─────────────────────┘
         │
         ↓
┌──────────────────────────────┐
│  Usuário Autenticado         │
│  ├─ Acesso a rotas privadas  │
│  ├─ Token em headers         │
│  └─ Pode usar IA             │
└──────────────────────────────┘
```

---

## Fluxo de Geração de Treino

```
┌─────────────────────────────────────┐
│  Usuário no Chat                    │
│  "Quero um treino para hipertrofia" │
└────────┬────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────┐
│  Frontend: useAI.sendMessage()      │
│  ├─ Captura mensagem                │
│  ├─ Envia para backend              │
│  └─ Aguarda resposta                │
└────────┬────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────┐
│  Backend: POST /ai/chat             │
│  ├─ Recebe mensagem                 │
│  ├─ Envia para OpenAI               │
│  └─ Retorna resposta                │
└────────┬────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────┐
│  OpenAI Responde                    │
│  "Ótimo! Preciso saber:             │
│   - Seu nível                       │
│   - Dias por semana                 │
│   - Duração"                        │
└────────┬────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────┐
│  Usuário Fornece Dados              │
│  "Intermediário, 4 dias, 60 min"    │
└────────┬────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────┐
│  Backend: POST /ai/generate-workout │
│  ├─ Recebe userProfile              │
│  ├─ Envia para OpenAI               │
│  └─ Retorna JSON com treino         │
└────────┬────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────┐
│  OpenAI Gera Treino JSON            │
│  {                                  │
│    "title": "Plano...",             │
│    "days": [...],                   │
│    "exercises": [...]               │
│  }                                  │
└────────┬────────────────────────────┘
         │
         ↓
┌─────────────────────────────��───────┐
│  Frontend Exibe Treino              │
│  ├─ Parse JSON                      │
│  ├─ Renderiza componentes           │
│  └─ Mostra botão "Salvar"           │
└────────┬────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────┐
│  Usuário Clica "Salvar"             │
└────────┬────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────┐
│  Frontend: WorkoutContext.save()    │
│  ├─ Salva em estado                 │
│  ├─ Adiciona ID e timestamp         │
│  └─ Atualiza UI                     │
└────────┬────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────┐
│  Treino Salvo!                      │
│  ├─ Aparece em Home.jsx             │
│  ├─ Pode ser acessado em /workout   │
│  └─ Pode ser editado/deletado       │
└─────────────────────────────────────┘
```

---

## Tecnologias em Ação

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND                             │
│  React 19 + Vite                                        │
│  ├─ Componentes funcionais                              │
│  ├─ Hooks (useState, useEffect, useContext)             │
│  ├─ Context API (Auth, Workout)                         │
│  └─ Axios para HTTP                                     │
│                                                         │
│  Styling                                                │
│  ├─ Tailwind CSS                                        │
│  ├─ Framer Motion (animações)                           │
│  └─ Lucide React (ícones)                               │
│                                                         │
│  Roteamento                                             │
│  └─ React Router v7                                     │
└─────────────────────────────────────────────────────────┘
                          ↓ (HTTP/REST)
┌─────────────────────────────────────────────────────────┐
│                    BACKEND                              │
│  Node.js + Express                                      │
│  ├─ Servidor HTTP                                       │
│  ├─ Rotas RESTful                                       │
│  ├─ Middleware (CORS, JSON)                             │
│  └─ Tratamento de erros                                 │
│                                                         │
│  Integração IA                                          │
│  ├─ OpenAI API                                          │
│  ├─ GPT-4 Turbo                                         │
│  └─ Chat Completions                                    │
│                                                         │
│  Autenticação                                           │
│  └─ JWT (simulado)                                      │
└─────────────────────────────────────────────────────────┘
                          ↓ (HTTP/REST)
┌─────────────────────────────────────────────────────────┐
│                    OPENAI API                           │
│  ├─ GPT-4 Turbo (Geração de treinos/dietas)            │
│  ├─ Chat Completions (Conversas)                        │
│  └─ JSON Parsing                                        │
└─────────────────────────────────────────────────────────┘
```

---

## Checklist Visual

```
✅ Backend
  ✅ Servidor Express
  ✅ Rotas IA
  ✅ Rotas Auth
  ✅ Integração OpenAI
  ✅ CORS configurado

✅ Frontend
  ✅ React + Vite
  ✅ Autenticação
  ✅ Roteamento
  ✅ ChatBot
  ✅ Páginas
  ✅ Contextos
  ✅ Hooks
  ✅ Serviços

✅ Documentação
  ✅ README
  ✅ SETUP
  ✅ ARCHITECTURE
  ✅ CONFIG
  ✅ PROMPTS
  ✅ CHECKLIST
  ✅ TROUBLESHOOTING

🔄 Próximos
  ⬜ Banco de dados
  ⬜ Autenticação real
  ⬜ Histórico persistente
  ⬜ Testes
  ⬜ Deploy
```

---

**Última atualização:** 2024
**Status:** ✅ Pronto para usar!
