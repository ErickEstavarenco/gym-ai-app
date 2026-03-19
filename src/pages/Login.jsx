import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Dumbbell, Mail, Lock, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
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
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gym-orange rounded-2xl shadow-lg shadow-gym-orange/20">
              <Dumbbell size={40} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Gym AI</h1>
          <p className="text-gym-muted mt-2">O seu treinador pessoal com inteligência artificial</p>
        </div>

        <div className="bg-gym-card p-8 rounded-3xl border border-white/5 shadow-2xl">
          <form onSubmit={onSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl text-sm text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gym-muted ml-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gym-muted" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  required
                  className="w-full bg-gym-dark border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-gym-orange transition-colors"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gym-muted ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gym-muted" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={onChange}
                  required
                  className="w-full bg-gym-dark border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-gym-orange transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gym-orange hover:bg-gym-accent text-white font-bold py-4 rounded-2xl shadow-lg shadow-gym-orange/20 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-gym-muted">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-gym-orange font-semibold hover:underline">
              Cadastre-se
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
