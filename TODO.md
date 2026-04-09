# TODO: Deploy Seguro gym-ai-app para Render (branch v2.0)

## 1. Configurar Git Remote e Branch ✅ Próximo
- `git remote add origin https://github.com/ErickEstavarenco/gym-ai-app.git`
- `git branch v2.0`
- `git checkout v2.0`
- `git push -u origin v2.0`

## 2. Edições de Arquivos (BLACKBOXAI concluído) ✅
- [x] backend/server.js: PORT env, CORS seguro
- [x] backend/package.json: script 'start'
- [x] .env.example: templates vars
- [x] Frontend AuthContext.jsx: VITE_API_URL

## 3. Commit e Push
- `git add .`
- `git commit -m "Deploy Render: security + env config v2.0"`
- `git push`

## 4. Render Deploy (Usuário)
- Criar Postgres DB (free), copiar DATABASE_URL
- New Web Service > GitHub repo/branch v2.0 > backend/ como root
  - Build: (vazio)
  - Start: `npm start`
  - Env: DATABASE_URL, JWT_SECRET=gerado
- Backend URL: ex https://gym-ai-backend.onrender.com
- New Static Site > repo > Build `npm install && npm run build`
  - Env: VITE_API_URL=backend-url
- Test API + frontend

## 5. Testes
- Backend: curl https://.../auth/register
- Frontend: login/register funciona?

Progresso atualizado a cada passo.
