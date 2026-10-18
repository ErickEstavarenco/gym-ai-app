import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ChevronLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button, Card, Input, Logo } from '../components/ui';
import { fadeUp, springBounce, staggerParent } from '../lib/motion';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gym-bg bg-canvas-glow flex flex-col items-center justify-center p-6 text-gym-text-primary">
      <motion.div
        variants={staggerParent(0.1)}
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
            Voltar para login
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
          <h1 className="font-display impact-text text-3xl text-white">
            Recuperar<span className="gradient-text"> Senha</span>
          </h1>
          <p className="text-gym-text-secondary text-sm">
            Enviaremos um link de recuperação para o seu e-mail
          </p>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Card variant="glass" padding="lg" className="rounded-hero">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  variants={springBounce}
                  initial="hidden"
                  animate="show"
                  className="text-center py-4 space-y-4"
                >
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-gym-success/15 flex items-center justify-center">
                      <CheckCircle2 size={36} className="text-gym-success" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gym-text-primary">
                    E-mail enviado!
                  </h3>
                  <p className="text-sm text-gym-text-secondary">
                    Verifique a caixa de entrada em{' '}
                    <span className="text-gym-text-primary font-semibold">{email}</span>
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={() => navigate('/login')}
                  >
                    Voltar para login
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-5"
                >
                  {error && (
                    <div className="flex items-start gap-2.5 bg-gym-danger/10 border border-gym-danger/30 text-gym-danger p-3.5 rounded-xl text-sm">
                      <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <Input
                    label="E-mail"
                    icon={Mail}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="xl"
                    loading={loading}
                    fullWidth
                  >
                    Enviar link
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;