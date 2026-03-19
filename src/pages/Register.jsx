import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Dumbbell, Mail, Lock, User, Loader2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
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
        className="w-full max-w-md space-y-8"
      >
        <Link to="/login" className="flex items-center gap-2 text-gym-muted hover:text-gym-orange transition-colors mb-4 w-fit">
          <ArrowLeft size={20} />
          <span>Voltar para Login</span>
        </Link>

        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Criar Conta</h1>
          <p className="text-gym-muted mt-2">Comece sua jornada com o Gym AI hoje</p>
        </div>

        <div className="bg-gym-card p-8 rounded-3xl border border-white/5 shadow-2xl">
          <form onSubmit={onSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl text-sm text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gym-muted ml-1">Nome Completo</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-gym-muted" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  required
                  className="w-full bg-gym-dark border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-gym-orange transition-colors"
                  placeholder="Seu nome"
                />
              </div>
            </div>

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
                  placeholder="Crie uma senha forte"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gym-orange hover:bg-gym-accent text-white font-bold py-4 rounded-2xl shadow-lg shadow-gym-orange/20 transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                "Criar Minha Conta"
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
