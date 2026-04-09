const express = require("express");
const cors = require("cors");
require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pool = require("./config/db");

const app = express();

app.use(cors({ 
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true 
}));
app.use(express.json());

/*
TESTE
*/
app.get("/", async (req, res) => {
  res.send("API OK");
});

/*
REGISTER
*/
app.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING id,name,email",
      [name, email, hashedPassword]
    );

    res.json(newUser.rows[0]);

  } catch (err) {
    console.error("REGISTER ERROR:", err.message);
    res.status(500).send("Server error");
  }
});

/*
LOGIN
*/
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(401).json({ msg: "Credenciais inválidas" });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(401).json({ msg: "Credenciais inválidas" });
    }

    const payload = {
      user: {
        id: user.rows[0].id
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });

  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    res.status(500).send("Server error");
  }
});

/*
MIDDLEWARE INLINE (pra eliminar erro)
*/
const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  console.log("TOKEN RECEBIDO:", token); // 👈 DEBUG

  if (!token) {
    return res.status(401).json({ msg: "Sem token, autorização negada" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("TOKEN DECODIFICADO:", decoded); // 👈 DEBUG

    req.user = decoded.user;

    next();
  } catch (err) {
    console.error("TOKEN ERROR:", err.message);
    res.status(401).json({ msg: "Token inválido" });
  }
};

/*
ROTA PROTEGIDA
*/
app.get("/profile", auth, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [req.user.id]
    );

    res.json(user.rows[0]);

  } catch (err) {
    console.error("PROFILE ERROR:", err.message);
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});