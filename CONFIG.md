# Configuração de Desenvolvimento

## Variáveis de Ambiente

### Frontend (.env.local - opcional)
```
VITE_API_URL=http://localhost:5000/api
VITE_DEV_MODE=true
```

### Backend (.env)
```
# OpenAI
OPENAI_API_KEY=sk-seu-token-aqui

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=sua-chave-secreta-aqui

# Database (futuro)
MONGODB_URI=mongodb://localhost:27017/gym-ai
```

## Scripts Úteis

### Rodar Tudo (2 terminais)

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```

### Build para Produção

```bash
# Frontend
npm run build

# Backend (não precisa build, mas pode usar PM2)
npm install -g pm2
pm2 start backend/server.js --name "gym-ai-backend"
```

## Estrutura de Dados

### User Profile
```javascript
{
  objective: 'hipertrofia' | 'emagrecimento' | 'força',
  level: 'iniciante' | 'intermediário' | 'avançado',
  daysPerWeek: 3 | 4 | 5 | 6,
  sessionDuration: 45 | 60 | 90,
  equipment: ['barra', 'halteres', 'máquinas', 'peso corporal'],
  restrictions: ['lesão no ombro', 'problema nas costas'],
  preferences: {
    favoriteExercises: [],
    dislikedExercises: [],
    mealsPerDay: 5
  }
}
```

### Workout Structure
```javascript
{
  id: timestamp,
  title: string,
  description: string,
  objective: string,
  level: string,
  daysPerWeek: number,
  totalWeeks: number,
  days: [
    {
      day: string,
      focus: string,
      duration: number,
      exercises: [
        {
          name: string,
          sets: number,
          reps: string,
          restSeconds: number,
          tempo: string,
          notes: string
        }
      ]
    }
  ],
  nutrition: {
    dailyCalories: number,
    macros: {
      protein: number,
      carbs: number,
      fat: number
    }
  },
  tips: string[],
  createdAt: ISO string,
  active: boolean
}
```

### Diet Structure
```javascript
{
  id: timestamp,
  title: string,
  objective: string,
  dailyCalories: number,
  macros: {
    protein: number,
    carbs: number,
    fat: number
  },
  meals: [
    {
      name: string,
      time: string (HH:MM),
      calories: number,
      items: [
        {
          food: string,
          quantity: number,
          unit: string,
          calories: number,
          protein: number,
          carbs: number,
          fat: number
        }
      ],
      substitutions: string[]
    }
  ],
  tips: string[],
  shoppingList: string[],
  createdAt: ISO string,
  active: boolean
}
```

## Fluxo de Dados

```
Frontend (React)
    ↓
useAI Hook
    ↓
aiService.js (Axios)
    ↓
Backend (Express)
    ↓
aiService.js (OpenAI)
    ↓
OpenAI API
    ↓
Response JSON
    ↓
Frontend (Parse & Display)
```

## Componentes Principais

### ChatBot.jsx
- Componente flutuante no canto inferior direito
- Integrado com useAI hook
- Suporta sugestões rápidas
- Histórico de conversa

### Chat.jsx
- Página completa de chat
- Mesma lógica do ChatBot
- Mais espaço para conversa
- Acessível via rota /chat

### Home.jsx
- Dashboard principal
- Mostra treinos salvos
- Botão flutuante para ChatBot
- Estatísticas rápidas

### ActiveWorkout.jsx
- Tela de execução do treino
- Timer para descanso
- Próximos exercícios
- Marcar como completo

### Diet.jsx
- Visualização do plano alimentar
- Refeições do dia
- Macronutrientes
- Substituições de alimentos

## Testes Recomendados

### 1. Teste de Geração de Treino
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

### 2. Teste de Geração de Dieta
```bash
curl -X POST http://localhost:5000/api/ai/generate-diet \
  -H "Content-Type: application/json" \
  -d '{
    "userProfile": {
      "objective": "ganho_massa",
      "dailyCalories": 2800,
      "mealsPerDay": 5
    }
  }'
```

### 3. Teste de Chat
```bash
curl -X POST http://localhost:5000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Quero criar um treino para ganhar massa",
    "conversationHistory": []
  }'
```

## Performance

### Otimizações Implementadas
- Lazy loading de componentes
- Memoização com React.memo
- Debounce em inputs
- Caching de respostas da IA

### Próximas Otimizações
- Implementar Service Worker
- Compressão de imagens
- Code splitting
- CDN para assets estáticos

## Segurança

### Implementado
- CORS configurado
- Validação de inputs no backend
- JWT para autenticação

### Recomendado para Produção
- HTTPS obrigatório
- Rate limiting
- Validação de schema com Joi/Zod
- Sanitização de inputs
- Helmet.js para headers de segurança
- Variáveis de ambiente seguras

## Deployment

### Opções Recomendadas

**Frontend:**
- Vercel (recomendado para Vite)
- Netlify
- GitHub Pages

**Backend:**
- Heroku
- Railway
- Render
- AWS EC2

### Exemplo com Vercel + Railway

1. Frontend no Vercel
2. Backend no Railway
3. Variáveis de ambiente configuradas
4. CORS atualizado para domínios de produção

## Monitoramento

### Logs
- Frontend: Console do navegador
- Backend: Winston ou Pino

### Erros
- Sentry para rastreamento de erros
- LogRocket para sessões do usuário

### Performance
- Google Analytics
- Lighthouse CI

## Próximas Features

- [ ] Histórico persistente (banco de dados)
- [ ] Autenticação real com OAuth
- [ ] Integração com Stripe (pagamento)
- [ ] Notificações push
- [ ] Modo offline
- [ ] Sincronização em tempo real
- [ ] Comunidade/Social features
- [ ] Integração com wearables
- [ ] Análise de progresso com gráficos
- [ ] Recomendações personalizadas

---

**Última atualização:** 2024
