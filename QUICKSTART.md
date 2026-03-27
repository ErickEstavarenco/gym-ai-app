# ⚡ Guia de Início Rápido - 5 Minutos

## 🎯 Objetivo
Ter o Gym AI App rodando em 5 minutos.

---

## ✅ Pré-requisitos

- ✅ Node.js 16+ instalado
- ✅ npm ou yarn
- ✅ Chave OpenAI (https://platform.openai.com/api-keys)
- ✅ Editor de código (VS Code recomendado)

---

## 🚀 Passo 1: Clonar/Preparar (1 min)

```bash
# Se ainda não tiver o projeto
cd c:\Users\Pichau\gym-ai-app-v2

# Verificar se está no diretório correto
ls -la
```

---

## 📦 Passo 2: Instalar Dependências (2 min)

```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

---

## ⚙️ Passo 3: Configurar OpenAI (1 min)

```bash
# Entrar na pasta backend
cd backend

# Criar arquivo .env
cp .env.example .env

# Editar .env (abrir com editor)
# Adicionar sua chave OpenAI:
# OPENAI_API_KEY=sk-seu-token-aqui
```

**Onde obter a chave:**
1. Acesse https://platform.openai.com/api-keys
2. Clique em "Create new secret key"
3. Copie a chave
4. Cole em backend/.env

---

## 🎬 Passo 4: Rodar o Projeto (1 min)

### Terminal 1 - Frontend
```bash
# Na raiz do projeto
npm run dev
```

Você verá:
```
VITE v7.3.1  ready in 123 ms

➜  Local:   http://localhost:5173/
```

### Terminal 2 - Backend
```bash
# Na pasta backend
cd backend
npm run dev
```

Você verá:
```
🚀 Servidor rodando em http://localhost:5000
📡 CORS habilitado para http://localhost:5173
```

---

## 🌐 Passo 5: Acessar (Imediato)

Abra seu navegador:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000/api/health

---

## 🎮 Usar o App

### 1. Fazer Login
- Email: `teste@teste.com` (qualquer email em DEV_MODE)
- Senha: `qualquer coisa`
- Clique em "Entrar"

### 2. Explorar Home
- Veja os treinos sugeridos
- Clique no botão de chat (laranja, canto inferior direito)

### 3. Usar o Chat
- Digite: "Quero criar um treino"
- Siga as sugestões
- Veja o treino sendo gerado

### 4. Salvar Treino
- Clique em "Salvar treino"
- Treino aparece em Home

---

## 🎯 Próximas Ações

### Explorar
- [ ] Ir para página Chat completa (/chat)
- [ ] Ir para página Diet (/diet)
- [ ] Ir para página Stats (/stats)
- [ ] Ir para página Profile (/profile)

### Testar
- [ ] Gerar treino de hipertrofia
- [ ] Gerar treino de emagrecimento
- [ ] Gerar plano alimentar
- [ ] Testar chat genérico

### Desenvolver
- [ ] Ler ARCHITECTURE.md
- [ ] Explorar código em src/
- [ ] Explorar código em backend/
- [ ] Modificar prompts em backend/services/aiService.js

---

## 🐛 Se Algo Não Funcionar

### Erro: "Cannot find module"
```bash
npm install
cd backend && npm install
```

### Erro: "CORS error"
- Verificar se backend está rodando em http://localhost:5000
- Verificar se frontend está em http://localhost:5173

### Erro: "Invalid API Key"
- Verificar se .env existe em backend/
- Verificar se OPENAI_API_KEY está correto
- Obter nova chave em https://platform.openai.com/api-keys

### Erro: "Port already in use"
```bash
# Mudar porta em backend/server.js
const PORT = process.env.PORT || 5001;
```

---

## 📚 Documentação

Para aprender mais:
- **README.md** - Resumo geral
- **SETUP.md** - Instalação detalhada
- **ARCHITECTURE.md** - Como funciona
- **TROUBLESHOOTING.md** - Problemas e soluções

---

## 🎓 Estrutura Básica

```
Frontend (React)
    ↓ (HTTP)
Backend (Express)
    ↓ (HTTP)
OpenAI API
    ↓
Resposta (JSON)
    ↓
Frontend exibe
```

---

## 💡 Dicas

### 1. DEV_MODE
- Está ativado por padrão
- Permite testar sem backend real
- Desativar em `src/context/AuthContext.jsx`

### 2. Modo Desenvolvimento
- Frontend recarrega automaticamente
- Backend recarrega com nodemon
- Abra console (F12) para ver erros

### 3. Testar API
```bash
# Testar health check
curl http://localhost:5000/api/health

# Testar geração de treino
curl -X POST http://localhost:5000/api/ai/generate-workout \
  -H "Content-Type: application/json" \
  -d '{"userProfile":{"objective":"hipertrofia","level":"intermediário","daysPerWeek":4,"sessionDuration":60,"equipment":["barra","halteres","máquinas"]}}'
```

---

## ✨ Funcionalidades Principais

### ✅ Já Funcionando
- [x] Chatbot IA
- [x] Geração de treinos
- [x] Geração de dietas
- [x] Autenticação
- [x] 9 páginas
- [x] Navegação

### 🔄 Próximas
- [ ] Banco de dados
- [ ] Autenticação real
- [ ] Histórico persistente

---

## 🎯 Checklist de Sucesso

- [ ] Node.js instalado
- [ ] npm install executado
- [ ] .env configurado
- [ ] Frontend rodando em http://localhost:5173
- [ ] Backend rodando em http://localhost:5000
- [ ] Conseguiu fazer login
- [ ] Conseguiu abrir chat
- [ ] Conseguiu gerar treino
- [ ] Conseguiu salvar treino

---

## 🚀 Próximos Passos

### Imediato
1. Explorar o app
2. Testar funcionalidades
3. Ler documentação

### Curto Prazo
1. Modificar prompts
2. Adicionar funcionalidades
3. Melhorar UI

### Médio Prazo
1. Adicionar banco de dados
2. Implementar autenticação real
3. Deploy em produção

---

## 📞 Precisa de Ajuda?

1. **Erro no console?** Abra F12 e veja a mensagem
2. **Erro no backend?** Veja o terminal onde rodou `npm run dev`
3. **Não consegue conectar?** Verificar se ambos estão rodando
4. **Chave OpenAI inválida?** Obter nova em https://platform.openai.com/api-keys

---

## 🎉 Parabéns!

Você tem o Gym AI App rodando! 🏋️💪

**Próximo:** Ler [README.md](README.md) para entender melhor o projeto.

---

**Tempo total:** ~5 minutos ⏱️
**Status:** ✅ Pronto para usar!
**Versão:** 1.0.0-beta
