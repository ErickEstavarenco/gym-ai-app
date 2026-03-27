import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Loader2, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulação de envio
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gym-dark flex flex-col items-center justify-center p-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        <Link to="/login" className="flex items-center gap-2 text-gym-muted hover:text-gym-orange transition-colors w-fit">
          <ArrowLeft size={20} />
          <span className="text-sm font-bold">VOLTAR</span>
        </Link>

        <div className="text-center">
          <h1 className="text-3xl font-black tracking-tight">RECUPERAR SENHA</h1>
          <p className="text-gym-muted mt-2">Enviaremos um link para seu e-mail</p>
        </div>

        <div className="bg-gym-card p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gym-muted ml-1 uppercase tracking-wider">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-gym-muted" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-gym-dark border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-gym-orange transition-colors text-sm"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-gym-orange to-gym-accent hover:opacity-90 text-white font-bold py-4 rounded-2xl shadow-lg shadow-gym-orange/20 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  "Enviar Link"
                )}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle size={64} className="text-green-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">E-mail enviado!</h2>
              <p className="text-gym-muted text-sm">
                Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
              </p>
              <Link
                to="/login"
                className="inline-block mt-6 text-gym-orange font-semibold hover:underline"
              >
                Voltar para o login
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;