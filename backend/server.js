Server · JS
Copiar

const express = require("express");
const cors = require("cors");
require("dotenv").config();
 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
 
const pool = require("./config/db");
const auth = require("./middleware/auth");
const workoutRoutes = require("./routes/workoutRoutes");
const aiRoutes = require("./routes/aiRoutes");
 
const app = express();
 
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
 
/* ─────────────────────────────────────────
   HELPER — gera token JWT
───────────────────────────────────────── */
const generateToken = (userId) => {
  return jwt.sign(
    { user: { id: userId } },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};
 
/* ─────────────────────────────────────────
   INICIALIZAÇÃO DAS TABELAS
───────────────────────────────────────── */
const ensureTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id       SERIAL PRIMARY KEY,
        name     TEXT NOT NULL,
        email    TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        weight   NUMERIC,
        height   NUMERIC,
        goal     TEXT,
        level    TEXT
      );
    `);
 
    await pool.query(`
      ALTER TABLE users
        ADD COLUMN IF NOT EXISTS weight NUMERIC,
        ADD COLUMN IF NOT EXISTS height NUMERIC,
        ADD COLUMN IF NOT EXISTS goal   TEXT,
        ADD COLUMN IF NOT EXISTS level  TEXT;
    `);
 
    await pool.query(`
      CREATE TABLE IF NOT EXISTS workouts (
        id         SERIAL PRIMARY KEY,
        user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        name       TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
 
    await pool.query(`
      CREATE TABLE IF NOT EXISTS exercises (
        id         SERIAL PRIMARY KEY,
        workout_id INTEGER NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
        name       TEXT NOT NULL,
        sets       INTEGER NOT NULL,
        reps       INTEGER NOT NULL
      );
    `);
 
    console.log("All tables checked/created");
  } catch (err) {
    console.error("DB TABLE ERROR:", err.message);
  }
};
 
ensureTables();
 
/* ─────────────────────────────────────────
   TESTE
───────────────────────────────────────── */
app.get("/", (req, res) => {
  res.send("API OK");
});
 
/* ─────────────────────────────────────────
   REGISTER
───────────────────────────────────────── */
app.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
 
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Preencha todos os campos" });
    }
 
    const hashedPassword = await bcrypt.hash(password, 10);
 
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id",
      [name, email, hashedPassword]
    );
 
    const token = generateToken(newUser.rows[0].id);
 
    res.json({ token });
 
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ msg: "Email já cadastrado" });
    }
    console.error("REGISTER ERROR:", err.message);
    res.status(500).json({ msg: "Erro interno do servidor" });
  }
});
 
/* ─────────────────────────────────────────
   LOGIN
───────────────────────────────────────── */
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
 
    if (!email || !password) {
      return res.status(400).json({ msg: "Preencha todos os campos" });
    }
 
    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
 
    if (user.rows.length === 0) {
      return res.status(401).json({ msg: "Credenciais inválidas" });
    }
 
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
 
    if (!validPassword) {
      return res.status(401).json({ msg: "Credenciais inválidas" });
    }
 
    const token = generateToken(user.rows[0].id);
 
    res.json({ token });
 
  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    res.status(500).json({ msg: "Erro interno do servidor" });
  }
});
 
/* ─────────────────────────────────────────
   GET /profile
───────────────────────────────────────── */
app.get("/profile", auth, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT id, name, email, weight, height, goal, level FROM users WHERE id = $1",
      [req.user.id]
    );
 
    if (user.rows.length === 0) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }
 
    res.json(user.rows[0]);
 
  } catch (err) {
    console.error("PROFILE GET ERROR:", err.message);
    res.status(500).json({ msg: "Erro interno do servidor" });
  }
});
 
/* ─────────────────────────────────────────
   PUT /profile
───────────────────────────────────────── */
app.put("/profile", auth, async (req, res) => {
  try {
    const { name, weight, height, goal, level } = req.body;
 
    const validGoals  = ["hipertrofia", "emagrecimento", "condicionamento", "forca"];
    const validLevels = ["iniciante", "intermediario", "avancado"];
 
    if (goal && !validGoals.includes(goal)) {
      return res.status(400).json({ msg: "Objetivo inválido" });
    }
 
    if (level && !validLevels.includes(level)) {
      return res.status(400).json({ msg: "Nível inválido" });
    }
 
    const updatedUser = await pool.query(
      `UPDATE users
       SET
         name   = COALESCE($1, name),
         weight = COALESCE($2, weight),
         height = COALESCE($3, height),
         goal   = COALESCE($4, goal),
         level  = COALESCE($5, level)
       WHERE id = $6
       RETURNING id, name, email, weight, height, goal, level`,
      [name, weight, height, goal, level, req.user.id]
    );
 
    res.json(updatedUser.rows[0]);
 
  } catch (err) {
    console.error("PROFILE PUT ERROR:", err.message);
    res.status(500).json({ msg: "Erro interno do servidor" });
  }
});
 
/* ─────────────────────────────────────────
   ROTAS
───────────────────────────────────────── */
app.use("/api", workoutRoutes);
app.use("/api", aiRoutes);
 
/* ─────────────────────────────────────────
   START
───────────────────────────────────────── */
const PORT = process.env.PORT || 5000;
 
app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});