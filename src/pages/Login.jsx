import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Dumbbell, Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
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
    <div className="min-h-screen bg-gym-dark flex flex-col items-center justify-center p-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        {/* Logo */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex justify-center mb-4"
          >
            <div className="p-4 bg-gradient-to-br from-gym-orange to-gym-accent rounded-2xl shadow-lg shadow-gym-orange/20">
              <Dumbbell size={48} className="text-white" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-black tracking-tight">Gym AI</h1>
          <p className="text-gym-muted mt-2">Seu treinador pessoal com inteligência artificial</p>
        </div>

        {/* Form */}
        <div className="bg-gym-card p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <form onSubmit={onSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-sm text-center"
              >
                {error}
              </motion.div>
            )}

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
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gym-muted hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-gym-orange hover:underline">
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-gym-orange to-gym-accent hover:opacity-90 text-white font-bold py-4 rounded-2xl shadow-lg shadow-gym-orange/20 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-gym-muted text-sm">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-gym-orange font-semibold hover:underline">
              Cadastre-se
            </Link>
          </div>
        </div>

        {/* Versão */}
        <p className="text-center text-gym-muted text-xs">Versão 1.0.0</p>
      </motion.div>
    </div>
  );
};

export default Login;