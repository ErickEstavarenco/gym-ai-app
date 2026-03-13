const express = require("express");
const cors = require("cors");
require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pool = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

/*
TESTE DE SERVIDOR
*/
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows);
});

/*
REGISTER USER
*/
app.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // inserir no banco
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING id,name,email",
      [name, email, hashedPassword]
    );

    res.json(newUser.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});