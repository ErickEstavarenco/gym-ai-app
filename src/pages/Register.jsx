import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Importação correta do Contexto
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Loader2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Pegamos a função register diretamente do nosso AuthContext
  const { register } = useAuth();
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Agora chamamos a função que está no AuthContext.jsx
    const res = await register(formData.name, formData.email, formData.password);
    
    if (res.success) {
      // Se der certo, o AuthContext já salvou o token, então vamos para a Home
      navigate('/');
    } else {
      setError(res.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gym-dark flex flex-col items-center justify-center p-6 text-white font-sans">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full max-w-md space-y-8"
      >
        <Link to="/login" className="flex items-center gap-2 text-gym-muted hover:text-gym-orange transition-colors mb-4 w-fit">
          <ArrowLeft size={20} />
          <span className="text-sm font-bold">VOLTAR PARA LOGIN</span>
        </Link>

        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tighter">CRIAR CONTA</h1>
          <p className="text-gym-muted mt-2 text-sm uppercase tracking-widest font-bold">Sua jornada começa aqui</p>
        </div>

        <div className="bg-gym-card p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <form onSubmit={onSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl text-xs font-bold text-center uppercase tracking-wider">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gym-muted ml-1 uppercase tracking-widest">Nome Completo</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-gym-muted" size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  required
                  className="w-full bg-gym-dark border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-gym-orange transition-colors text-sm font-bold"
                  placeholder="Seu nome"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gym-muted ml-1 uppercase tracking-widest">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gym-muted" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  required
                  className="w-full bg-gym-dark border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-gym-orange transition-colors text-sm font-bold"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gym-muted ml-1 uppercase tracking-widest">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gym-muted" size={18} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={onChange}
                  required
                  className="w-full bg-gym-dark border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-gym-orange transition-colors text-sm font-bold"
                  placeholder="Crie uma senha forte"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gym-orange hover:bg-gym-accent text-white font-black py-4 rounded-2xl shadow-lg shadow-gym-orange/20 transition-all active:scale-95 flex items-center justify-center gap-2 mt-4 text-sm uppercase tracking-widest"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
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
