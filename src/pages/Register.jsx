import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, ChevronLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button, Card, Input, Logo } from '../components/ui';
import { fadeUp, staggerParent } from '../lib/motion';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setLoading(true);
    const res = await register(name, email, password);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gym-bg bg-canvas-glow flex flex-col items-center justify-center p-6 text-gym-text-primary">
      <motion.div
        variants={staggerParent(0.08)}
        initial="hidden"
        animate="show"
        className="w-full max-w-md space-y-6"
      >
        <motion.div variants={fadeUp}>
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-gym-text-secondary hover:text-gym-text-primary text-sm transition-colors"
          >
            <ChevronLeft size={16} />
            Voltar
          </Link>
        </motion.div>

        <motion.div variants={fadeUp} className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="flex justify-center"
          >
            <Logo size="md" />
          </motion.div>
          <h1 className="font-display impact-text text-4xl text-white">
            Criar<span className="gradient-text"> Conta</span>
          </h1>
          <p className="text-gym-text-secondary text-sm">
            Comece sua transformação hoje
          </p>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Card variant="glass" padding="lg" className="rounded-hero">
            <form onSubmit={onSubmit} className="space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2.5 bg-gym-danger/10 border border-gym-danger/30 text-gym-danger p-3.5 rounded-xl text-sm"
                >
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}

              <Input
                label="Nome"
                icon={User}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                required
              />
              <Input
                label="E-mail"
                icon={Mail}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
              <Input
                label="Senha"
                icon={Lock}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                trailingIcon={showPassword ? EyeOff : Eye}
                onTrailingClick={() => setShowPassword(!showPassword)}
              />
              <Input
                label="Confirmar senha"
                icon={Lock}
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="xl"
                loading={loading}
                fullWidth
              >
                Criar conta
              </Button>
            </form>

            <div className="mt-6 text-center text-gym-text-secondary text-sm">
              Já tem conta?{' '}
              <Link to="/login" className="text-gym-accent link-underline font-semibold">
                Entrar
              </Link>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;