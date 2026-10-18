import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Flame, Trophy, Zap, Clock, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ChatBot from '../components/ChatBot';
import { Badge, Button, Card, PageShell, SectionHeader, Stat } from '../components/ui';
import { fadeUp, glowPulse, staggerParent } from '../lib/motion';

const workoutSplits = [
  { id: 1, name: 'PEITO & TRÍCEPS', focus: 'PUSH FOCUS • HIPERTROFIA', time: '55', exercises: 8, gradient: 'from-gym-accent to-orange-500', cta: 'INICIAR', completed: false, icon: Flame },
  { id: 2, name: 'COSTAS & BÍCEPS', focus: 'PULL FOCUS • FORÇA', time: '62', exercises: 7, gradient: 'from-sky-600 to-cyan-400', cta: 'REFAZER', completed: true, icon: TrendingUp },
  { id: 3, name: 'PERNAS & CORE', focus: 'LOWER BODY • ESTABILIDADE', time: '48', exercises: 6, gradient: 'from-emerald-600 to-teal-400', cta: 'INICIAR', completed: false, icon: Trophy },
];

const Home = () => {
  const { user, api } = useAuth();
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [latestWorkout, setLatestWorkout] = useState(null);
  const [latestDiet, setLatestDiet] = useState(null);

  const userInitial = (user?.name || user?.email || 'U')[0].toUpperCase();
  const greetingKicker = user?.name ? `Olá, ${user.name.split(' ')[0].toUpperCase()}` : 'MY DAILY ROUTINE';

  useEffect(() => {
    const fetchLatestPlan = async () => {
      if (!user?.id || !api) return;
      try {
        // ✅ CORRIGIDO: sem user.id na URL — backend usa JWT
        const res = await api.get('/api/ai/latest-plan');
        setLatestWorkout(res.data.latestWorkout);
        setLatestDiet(res.data.latestDiet);
      } catch (err) {
        // Silencioso — usuário novo sem plano ainda
      }
    };
    fetchLatestPlan();
  }, [user, api]);

  const header = (
    <SectionHeader
      kicker={greetingKicker}
      title="WORKOUT SPLIT"
      rightSlot={
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gym-accent to-gym-accent-hover flex items-center justify-center text-white font-display impact-text text-lg border-2 border-gym-bg shadow-glow-sm">
          {userInitial}
        </div>
      }
    />
  );

  return (
    <PageShell header={header}>
      <motion.div variants={staggerParent(0.08)} initial="hidden" animate="show" className="space-y-6">

        {/* AI Recommendation */}
        <motion.div variants={fadeUp}>
          <Card variant="glass" className="relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-gym-accent/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative flex items-start gap-4">
              <div className="bg-gradient-to-br from-gym-accent to-gym-accent-hover p-3 rounded-2xl shadow-glow-sm flex-shrink-0">
                <Zap size={20} className="text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-gym-text-primary text-sm uppercase tracking-wider">AI Recommendation</h3>
                <p className="text-xs text-gym-text-secondary mt-1.5 leading-relaxed">
                  {latestWorkout
                    ? `Seu último treino foi "${latestWorkout.title}". Quer continuar ou gerar um novo?`
                    : 'Converse com o Personal AI para gerar seu treino e dieta personalizados.'}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Latest Plan */}
        {(latestWorkout || latestDiet) && (
          <motion.div variants={fadeUp}>
            <Card variant="elevated" glow>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gym-text-primary text-sm uppercase tracking-wider">Plano AI recente</h3>
                <Badge variant="accent" size="sm"><Zap size={10} />AI</Badge>
              </div>
              <div className="space-y-4">
                {latestWorkout && (
                  <div>
                    <p className="text-base font-bold text-white">{latestWorkout.title}</p>
                    <p className="text-xs text-gym-text-secondary mt-1">{latestWorkout.objective || '—'} • {latestWorkout.days_per_week || '—'} dias/sem</p>
                  </div>
                )}
                {latestDiet && (
                  <div>
                    <p className="text-base font-bold text-white">{latestDiet.title}</p>
                    <p className="text-xs text-gym-text-secondary mt-1">{latestDiet.daily_calories || '—'} kcal/dia</p>
                  </div>
                )}
                <div className="flex gap-2 pt-2">
                  {latestWorkout && (
                    <Button variant="primary" size="md" onClick={() => navigate('/workout')} rightIcon={ArrowRight} className="flex-1">Iniciar treino</Button>
                  )}
                  {latestDiet && (
                    <Button variant="outline" size="md" onClick={() => navigate('/diet')} className="flex-1">Ver dieta</Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Workout Splits */}
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-gym-text-secondary uppercase tracking-[0.2em]">Splits disponíveis</h2>
            <Badge variant="neutral" size="sm">{workoutSplits.length}</Badge>
          </div>
          <div className="space-y-3">
            {workoutSplits.map((workout, index) => (
              <Card key={workout.id} variant="default" padding="lg" interactive onClick={() => navigate('/workout')} className="relative overflow-hidden group">
                <div className={`absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br ${workout.gradient} opacity-20 rounded-full blur-2xl group-hover:opacity-30 transition-opacity`} />
                <div className="relative">
                  <div className="flex justify-between items-start gap-3 mb-4">
                    <Badge variant="solid" size="sm">SPLIT {String.fromCharCode(65 + index)}</Badge>
                    <Badge variant="neutral" size="sm" icon={Clock}>{workout.time} MIN</Badge>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${workout.gradient} flex items-center justify-center shadow-glow-sm`}>
                      <workout.icon size={22} className="text-white" strokeWidth={2.5} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display impact-text text-2xl text-white leading-none">{workout.name}</h3>
                      <p className="text-[10px] text-gym-text-secondary uppercase tracking-wider mt-1 font-medium">{workout.focus}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" size="sm" icon={Dumbbell}>{workout.exercises} exercícios</Badge>
                    <Button variant={workout.completed ? 'ghost' : 'primary'} size="sm" rightIcon={ArrowRight} className="ml-auto">{workout.cta}</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeUp}>
          <h2 className="text-xs font-bold text-gym-text-secondary uppercase tracking-[0.2em] mb-3">Your stats</h2>
          <div className="grid grid-cols-2 gap-3">
            <Stat label="Treinos" value="12" unit="TOTAL" icon={Dumbbell} color="accent" />
            <Stat label="Calorias" value="1.2k" unit="SEMANA" icon={Flame} color="warning" />
          </div>
        </motion.div>

        {/* Streak */}
        <motion.div variants={fadeUp}>
          <Card variant="default" padding="md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-gym-text-secondary uppercase tracking-[0.15em]">Weekly Streak</span>
              <Badge variant="success" size="sm" icon={Trophy}>5 dias</Badge>
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-display impact-text text-4xl gradient-text">5 DAYS</span>
            </div>
            <div className="flex gap-1.5">
              {[65, 80, 50, 100, 65, 35, 75].map((h, i) => (
                <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }} className="flex-1 rounded-md bg-gradient-to-t from-gym-line to-gym-accent" style={{ minHeight: 4 }} />
              ))}
            </div>
          </Card>
        </motion.div>

      </motion.div>

      {/* Chat FAB */}
      <motion.button {...glowPulse} whileTap={{ scale: 0.92 }} onClick={() => setChatOpen(!chatOpen)} className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-gym-accent to-gym-accent-hover text-white rounded-full z-40 flex items-center justify-center hover:scale-105 transition-transform" aria-label="Chat AI">
        <MessageSquare size={26} strokeWidth={2.5} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-gym-success border-2 border-gym-bg rounded-full animate-pulse-dot" />
      </motion.button>

      <ChatBot isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </PageShell>
  );
};

export default Home;