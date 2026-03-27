# 🎯 Gym AI App - Resumo Executivo

## O que foi implementado

Um aplicativo completo de academia com chatbot IA que cria treinos e planos alimentares personalizados.

### ✨ Funcionalidades Principais

1. **Chatbot IA Integrado**
   - Conversa natural com assistente de treino
   - Gera treinos personalizados em JSON estruturado
   - Cria planos alimentares com macronutrientes
   - Fornece motivação e dicas

2. **Geração de Treinos**
   - Treinos por objetivo (hipertrofia, emagrecimento, força)
   - Adaptado ao nível (iniciante, intermediário, avançado)
   - Customizável por dias/semana e duração
   - Inclui exercícios, séries, repetições, tempos de descanso

3. **Planos Alimentares**
   - Dietas personalizadas por objetivo
   - Cálculo automático de macronutrientes
   - Sugestões de refeições com calorias
   - Alternativas de alimentos

4. **Autenticação**
   - Login/Registro de usuários
   - Recuperação de senha
   - Proteção de rotas privadas
   - Modo DEV para testes

5. **Dashboard**
   - Visualização de treinos salvos
   - Estatísticas rápidas
   - Acesso rápido ao chat
   - Navegação intuitiva

---

## Arquitetura

### Frontend (React + Vite)
- **Componentes**: ChatBot, Navbar, Páginas
- **Contextos**: AuthContext, WorkoutContext
- **Hooks**: useAI (gerencia IA)
- **Serviços**: aiService (cliente HTTP)
- **Styling**: Tailwind CSS + Framer Motion

### Backend (Express + Node.js)
- **Rotas**: IA, Autenticação
- **Serviços**: Integração OpenAI
- **Middleware**: CORS, JSON
- **Validação**: Inputs básicos

### Integração
- **API**: OpenAI GPT-4 Turbo
- **Comunicação**: HTTP/REST com Axios
- **Autenticação**: JWT (simulado)

---

## Estrutura de Arquivos

```
gym-ai-app-v2/
├── src/                    # Frontend React
│   ├── components/         # ChatBot, Navbar
│   ├── context/            # Auth, Workout
│   ├── hooks/              # useAI
│   ├── pages/              # 9 páginas
│   ├── services/           # aiService
│   └── App.jsx
├── backend/                # Backend Express
│   ├── routes/             # AI, Auth
│   ├── services/           # aiService
│   └── server.js
├── SETUP.md                # Guia de instalação
├── PROMPTS.md              # Exemplos de prompts
├── CONFIG.md               # Configuração
├── ARCHITECTURE.md         # Arquitetura
└── CHECKLIST.md            # Checklist
```

---

## Como Usar

### 1. Instalação

```bash
# Frontend
npm install

# Backend
cd backend
npm install
cp .env.example .env
# Editar .env e adicionar OPENAI_API_KEY
```

### 2. Rodar

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd backend
npm run dev
```

### 3. Acessar

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### 4. Usar

1. Fazer login (DEV_MODE ativo)
2. Clicar no botão de chat
3. Digitar "Quero criar um treino"
4. Seguir as sugestões
5. Treino é gerado e pode ser salvo

---

## Endpoints da API

### IA
- `POST /api/ai/generate-workout` - Gera treino
- `POST /api/ai/generate-diet` - Gera dieta
- `POST /api/ai/chat` - Chat genérico

### Autenticação
- `POST /api/auth/register` - Registrar
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil

---

## Exemplo de Uso

### Gerar Treino

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

### Resposta

```json
{
  "title": "Plano de Hipertrofia 4 Dias",
  "description": "Focado em ganho de massa muscular",
  "days": [
    {
      "day": "Segunda",
      "focus": "Peito & Tríceps",
      "exercises": [
        {
          "name": "Supino Reto",
          "sets": 4,
          "reps": "8-12",
          "restSeconds": 90
        }
      ]
    }
  ]
}
```

---

## Tecnologias Utilizadas

### Frontend
- React 19
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- React Router
- Axios

### Backend
- Node.js
- Express
- OpenAI API
- JWT
- CORS

---

## Próximos Passos

### Curto Prazo (1-2 semanas)
1. Configurar banco de dados (MongoDB/PostgreSQL)
2. Implementar autenticação real com JWT
3. Persistir histórico de treinos/dietas
4. Melhorar UI das páginas Diet e ActiveWorkout

### Médio Prazo (1 mês)
1. Implementar sistema de pagamento
2. Adicionar análise de progresso com gráficos
3. Criar sistema de notificações
4. Integração com wearables

### Longo Prazo (3+ meses)
1. Versão mobile nativa
2. Comunidade e social features
3. Integração com apps de nutrição
4. Recomendações personalizadas com ML

---

## Checklist de Implementação

### ✅ Concluído
- [x] Backend estruturado
- [x] Integração OpenAI
- [x] Frontend React
- [x] Autenticação básica
- [x] ChatBot integrado
- [x] Geração de treinos
- [x] Geração de dietas
- [x] Documentação completa

### 🔄 Em Progresso
- [ ] Banco de dados
- [ ] Autenticação real
- [ ] Histórico persistente
- [ ] Testes automatizados

### 📋 Planejado
- [ ] Deploy em produção
- [ ] Versão mobile
- [ ] Integração com wearables
- [ ] Comunidade

---

## Troubleshooting

### Erro: "Cannot find module 'openai'"
```bash
cd backend && npm install openai
```

### Erro: "CORS error"
Verificar se backend está em http://localhost:5000

### Erro: "Invalid API Key"
Verificar .env e chave OpenAI

### Erro: "Port already in use"
Mudar porta em backend/server.js

---

## Recursos

- [OpenAI Docs](https://platform.openai.com/docs)
- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)
- [Tailwind CSS](https://tailwindcss.com)

---

## Suporte

Para dúvidas:
1. Ler SETUP.md
2. Ler CONFIG.md
3. Ler PROMPTS.md
4. Verificar console (F12)
5. Verificar logs do backend

---

## Licença

MIT

---

## Autor

Desenvolvido para Gym AI App v2

**Versão:** 1.0.0-beta
**Status:** Em desenvolvimento ativo
**Última atualização:** 2024

---

## 🚀 Começar Agora

1. Clone o repositório
2. Instale dependências: `npm install && cd backend && npm install`
3. Configure .env com sua chave OpenAI
4. Rode: `npm run dev` (frontend) e `cd backend && npm run dev` (backend)
5. Acesse http://localhost:5173
6. Faça login e comece a usar!

**Bom treino! 💪**
