import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

const router = express.Router();

/**
 * POST /api/auth/register
 * Registra um novo usuário
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Preencha todos os campos' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '7d' }
    );

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Erro ao registrar:', error);
    res.status(500).json({ msg: 'Erro ao registrar' });
  }
});

/**
 * POST /api/auth/login
 * Faz login do usuário
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Email e senha são obrigatórios' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ msg: 'Email ou senha inválidos' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '7d' }
    );

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ msg: 'Erro ao fazer login' });
  }
});

/**
 * GET /api/auth/profile
 * Retorna o perfil do usuário autenticado
 */
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers['x-auth-token'];

    if (!token) {
      return res.status(401).json({ msg: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    res.status(401).json({ msg: 'Token inválido' });
  }
});

export default router;
