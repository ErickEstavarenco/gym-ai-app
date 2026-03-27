import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Loader2, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);

    const res = await register(formData.name, formData.email, formData.password);

    if (res.success) {
      navigate('/');
    } else {
      setError(res.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gym-dark flex flex-col items-center justify-center p-6 text-white">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full max-w-md space-y-6"
      >
        <Link to="/login" className="flex items-center gap-2 text-gym-muted hover:text-gym-orange transition-colors w-fit">
          <ArrowLeft size={20} />
          <span className="text-sm font-bold">VOLTAR</span>
        </Link>

        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight">CRIAR CONTA</h1>
          <p className="text-gym-muted mt-2 text-sm uppercase tracking-widest font-bold">Sua jornada começa aqui</p>
        </div>

        <div className="bg-gym-card p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <form onSubmit={onSubmit} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-gym-muted ml-1 uppercase tracking-wider">Nome Completo</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-gym-muted" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  required
                  className="w-full bg-gym-dark border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-gym-orange transition-colors text-sm"
                  placeholder="Seu nome"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gym-muted ml-1 uppercase tracking-wider">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gym-muted" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  required
                  className="w-full bg-gym-dark border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-gym-orange transition-colors text-sm"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gym-muted ml-1 uppercase tracking-wider">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gym-muted" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={onChange}
                  required
                  className="w-full bg-gym-dark border border-white/10 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:border-gym-orange transition-colors text-sm"
                  placeholder="Mínimo 6 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gym-muted hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gym-muted ml-1 uppercase tracking-wider">Confirmar Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gym-muted" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={onChange}
                  required
                  className="w-full bg-gym-dark border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-gym-orange transition-colors text-sm"
                  placeholder="Repita a senha"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-gym-orange to-gym-accent hover:opacity-90 text-white font-bold py-4 rounded-2xl shadow-lg shadow-gym-orange/20 transition-all active:scale-95 flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                "Criar Minha Conta"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-gym-muted text-xs">
          Ao criar uma conta, você concorda com nossos{' '}
          <Link to="/terms" className="text-gym-orange hover:underline">Termos de Uso</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;