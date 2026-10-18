import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button, Card, Input, Logo } from '../components/ui';
import { fadeUp, springBounce, staggerParent } from '../lib/motion';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await login(formData.email, formData.password);
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
        variants={staggerParent(0.1)}
        initial="hidden"
        animate="show"
        className="w-full max-w-md space-y-8"
      >
        {/* Logo */}
        <motion.div variants={fadeUp} className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="flex justify-center"
          >
            <Logo size="lg" />
          </motion.div>
          <div>
            <h1 className="font-display impact-text text-4xl text-white">
              Gym<span className="gradient-text"> AI</span>
            </h1>
            <p className="text-gym-text-secondary text-sm mt-2">
              Seu treinador pessoal com inteligência artificial
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div variants={fadeUp}>
          <Card variant="glass" padding="lg" className="rounded-hero">
            <form onSubmit={onSubmit} className="space-y-5">
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
                label="E-mail"
                icon={Mail}
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                placeholder="seu@email.com"
                required
              />

              <Input
                label="Senha"
                icon={Lock}
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={onChange}
                placeholder="••••••••"
                required
                trailingIcon={showPassword ? EyeOff : Eye}
                onTrailingClick={() => setShowPassword(!showPassword)}
              />

              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-gym-accent link-underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="xl"
                loading={loading}
                fullWidth
              >
                Entrar
              </Button>
            </form>

            <div className="mt-6 text-center text-gym-text-secondary text-sm">
              Não tem uma conta?{' '}
              <Link to="/register" className="text-gym-accent link-underline font-semibold">
                Cadastre-se
              </Link>
            </div>
          </Card>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="text-center text-gym-text-muted text-[10px] uppercase tracking-[0.2em]"
        >
          Versão 2.0
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;