# 🔧 Troubleshooting & FAQ

## Problemas Comuns

### 1. Erro: "Cannot find module 'openai'"

**Problema:** Backend não consegue importar OpenAI

**Solução:**
```bash
cd backend
npm install openai
```

**Verificar:**
```bash
npm list openai
```

---

### 2. Erro: "CORS error" no console

**Problema:** Frontend não consegue comunicar com backend

**Causas possíveis:**
- Backend não está rodando
- Porta errada
- CORS não configurado

**Solução:**
```bash
# Verificar se backend está rodando
curl http://localhost:5000/api/health

# Se não funcionar, rodar backend
cd backend
npm run dev

# Verificar CORS em backend/server.js
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

---

### 3. Erro: "Invalid API Key"

**Problema:** OpenAI API key inválida ou não configurada

**Solução:**
```bash
# 1. Verificar se .env existe
cd backend
ls -la .env

# 2. Se não existir, criar
cp .env.example .env

# 3. Editar .env e adicionar chave
# OPENAI_API_KEY=sk-seu-token-aqui

# 4. Obter chave em https://platform.openai.com/api-keys

# 5. Reiniciar backend
npm run dev
```

**Verificar chave:**
```bash
# No backend, adicionar log
console.log('API Key:', process.env.OPENAI_API_KEY);
```

---

### 4. Erro: "Port 5000 already in use"

**Problema:** Outra aplicação está usando porta 5000

**Solução 1 - Mudar porta:**
```bash
# Em backend/server.js
const PORT = process.env.PORT || 5001;

# Ou via variável de ambiente
PORT=5001 npm run dev
```

**Solução 2 - Liberar porta:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

---

### 5. Erro: "Module not found"

**Problema:** Dependências não instaladas

**Solução:**
```bash
# Frontend
rm -rf node_modules package-lock.json
npm install

# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
```

---

### 6. Erro: "Cannot GET /api/ai/generate-workout"

**Problema:** Rota não encontrada

**Verificar:**
```bash
# 1. Verificar se backend está rodando
curl http://localhost:5000/api/health

# 2. Verificar se rota existe em backend/routes/aiRoutes.js
# 3. Verificar se rota está registrada em backend/server.js
import aiRoutes from './routes/aiRoutes.js';
app.use('/api/ai', aiRoutes);

# 4. Reiniciar backend
npm run dev
```

---

### 7. Erro: "Unexpected token < in JSON"

**Problema:** Backend retornando HTML em vez de JSON

**Causa:** Erro no servidor (500)

**Solução:**
```bash
# 1. Verificar logs do backend
# 2. Verificar se OpenAI API key está correta
# 3. Verificar se OpenAI está respondendo
curl -X POST https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer sk-seu-token" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-4-turbo","messages":[{"role":"user","content":"test"}]}'
```

---

### 8. Erro: "Frontend não conecta ao backend"

**Problema:** Frontend não consegue fazer requisições

**Verificar:**
```bash
# 1. Backend está rodando?
curl http://localhost:5000/api/health

# 2. CORS está configurado?
# Em backend/server.js
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

# 3. URL está correta?
# Em src/services/aiService.js
const API_BASE_URL = 'http://localhost:5000/api';

# 4. Verificar console do navegador (F12)
```

---

### 9. Erro: "DEV_MODE não funciona"

**Problema:** Login não funciona em modo desenvolvimento

**Solução:**
```bash
# Em src/context/AuthContext.jsx
const DEV_MODE = true; // Deve estar true

# Se ainda não funcionar, verificar localStorage
# No console do navegador
localStorage.getItem('token')
localStorage.setItem('token', 'test-token')
```

---

### 10. Erro: "Chat não responde"

**Problema:** IA não está respondendo

**Verificar:**
```bash
# 1. OpenAI API key está correta?
# 2. Limite de requisições atingido?
# 3. Modelo correto? (gpt-4-turbo)
# 4. Verificar logs do backend

# Testar manualmente
curl -X POST http://localhost:5000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Olá",
    "conversationHistory": []
  }'
```

---

## FAQ

### P: Como obter chave OpenAI?
**R:** Acesse https://platform.openai.com/api-keys, crie uma nova chave e copie.

### P: Qual modelo usar?
**R:** Recomendado `gpt-4-turbo` para melhor qualidade. Alternativa: `gpt-3.5-turbo` (mais barato).

### P: Quanto custa usar OpenAI?
**R:** Depende do modelo e tokens. Veja preços em https://openai.com/pricing

### P: Posso usar sem OpenAI?
**R:** Sim, mas precisa implementar outra IA (ex: Anthropic, Cohere).

### P: Como fazer deploy?
**R:** Frontend em Vercel, Backend em Railway/Render. Veja SETUP.md

### P: Posso usar banco de dados?
**R:** Sim, recomendado MongoDB ou PostgreSQL. Veja CONFIG.md

### P: Como adicionar autenticação real?
**R:** Implementar JWT real com bcrypt. Veja CONFIG.md

### P: Posso modificar prompts?
**R:** Sim, em backend/services/aiService.js. Veja PROMPTS.md

### P: Como testar sem frontend?
**R:** Use curl ou Postman. Veja exemplos em SETUP.md

### P: Qual é o limite de requisições?
**R:** Depende do plano OpenAI. Veja https://platform.openai.com/account/rate-limits

---

## Dicas de Debug

### 1. Ativar logs detalhados

```javascript
// Em backend/server.js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Em frontend, adicionar console.log
console.log('Enviando:', data);
```

### 2. Verificar requisições

```bash
# Terminal
curl -v http://localhost:5000/api/health

# Ou usar Postman
# https://www.postman.com/
```

### 3. Verificar localStorage

```javascript
// No console do navegador
localStorage.getItem('token')
localStorage.clear()
```

### 4. Verificar variáveis de ambiente

```bash
# Backend
echo $OPENAI_API_KEY

# Ou em código
console.log(process.env.OPENAI_API_KEY);
```

### 5. Verificar portas

```bash
# Windows
netstat -ano | findstr LISTENING

# Mac/Linux
lsof -i -P -n | grep LISTEN
```

---

## Performance

### Otimizações Implementadas
- Lazy loading de componentes
- Memoização com React.memo
- Debounce em inputs
- Caching de respostas

### Se estiver lento
1. Verificar conexão de internet
2. Verificar se OpenAI está respondendo
3. Verificar se há muitas requisições simultâneas
4. Aumentar timeout em aiService.js

---

## Segurança

### ���️ Não fazer em produção
- Deixar DEV_MODE = true
- Expor chave OpenAI no frontend
- Usar JWT sem HTTPS
- Sem validação de inputs

### ✅ Fazer em produção
- HTTPS obrigatório
- Chave OpenAI apenas no backend
- JWT com expiração
- Validação de inputs com Joi/Zod
- Rate limiting
- CORS restritivo

---

## Contato & Suporte

Se o problema persistir:
1. Verificar todos os passos acima
2. Ler documentação (SETUP.md, CONFIG.md)
3. Verificar logs do navegador (F12)
4. Verificar logs do backend (terminal)
5. Procurar em issues do GitHub

---

**Última atualização:** 2024
**Versão:** 1.0.0-beta
