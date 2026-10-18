import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Utensils,
  ChevronRight,
  Plus,
  Apple,
  RefreshCw,
  Lightbulb,
} from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  PageShell,
  SectionHeader,
  Stat,
} from '../components/ui';
import { fadeUp, staggerParent } from '../lib/motion';
import { useWorkout } from '../context/WorkoutContext';
import { generateLocalDiet, generateDiet } from '../services/aiService';
import { useAI } from '../hooks/useAI';
import { mealIconFor } from '../data/dietIcons';

/**
 * Diet.jsx — agora consome WorkoutContext.
 *
 *   - Sem currentDiet: gera via aiService.generateLocalDiet(userProfile)
 *     automaticamente no mount e salva em WorkoutContext.
 *   - Botão "Regenerar" usa a IA pra gerar uma nova dieta via
 *     useAI.generateNewDiet (que cai pro fallback local se DEV_MODE).
 *
 * As refeições (`diet.meals[]`) vêm em shape `{name, time, calories,
 * items:[{food, quantity, unit, calories, protein, carbs, fat}],
 * substitutions}` e são adaptadas pro layout atual.
 */
const Diet = () => {
  const { userProfile, currentDiet, saveDiet } = useWorkout();
  const { generateNewDiet, loading } = useAI();
  const [localDiet, setLocalDiet] = useState(currentDiet);

  // Garante que sempre tenha uma dieta disponível. Se o user chegar
  // primeiro na rota /diet sem ter gerado nada pelo chat, monta agora.
  useEffect(() => {
    if (currentDiet) {
      setLocalDiet(currentDiet);
      return;
    }
    const generated = generateLocalDiet({
      objective: mapObjectiveForDiet(userProfile.objective),
      dailyCalories: userProfile.dailyCalories || 2500,
      mealsPerDay: userProfile.mealsPerDay || 5,
    });
    const saved = saveDiet(generated);
    setLocalDiet(saved);
  }, [currentDiet, saveDiet, userProfile]);

  const handleRegenerate = async () => {
    try {
      const adapted = {
        ...userProfile,
        objective: mapObjectiveForDiet(userProfile.objective),
        dailyCalories: userProfile.dailyCalories || 2500,
        mealsPerDay: userProfile.mealsPerDay || 5,
      };
      const next = await generateNewDiet(adapted);
      const saved = saveDiet(next);
      setLocalDiet(saved);
    } catch (err) {
      // falha silenciosa — a dieta atual segue aparecendo
      // eslint-disable-next-line no-console
      console.warn('[Diet] regenerate falhou:', err);
    }
  };

  const meals = useMemo(() => {
    if (!localDiet?.meals) return [];
    return localDiet.meals.map((m, idx) => ({
      id: `meal-${idx}`,
      name: m.name,
      time: m.time,
      icon: mealIconFor(m.name),
      calories: m.calories,
      items: Array.isArray(m.items) ? m.items.map((i) => i.food) : [],
      // marca só a primeira refeição como completed (visual inicial)
      completed: idx === 0,
    }));
  }, [localDiet]);

  const totalCalories = meals.reduce((acc, m) => acc + m.calories, 0);
  const completedMeals = meals.filter((m) => m.completed).length;

  const tip = localDiet?.tips?.[0] || 'Beba pelo menos 3L de água por dia';

  return (
    <PageShell
      header={
        <SectionHeader
          kicker="NUTRIÇÃO"
          title={localDiet?.title || 'PLANO ALIMENTAR'}
          subtitle="Sua nutrição diária"
        />
      }
    >
      <motion.div variants={staggerParent(0.08)} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
          <Stat label="Calorias" value={totalCalories} unit="KCAL" icon={Apple} color="accent" />
          <Stat
            label="Refeições"
            value={`${completedMeals}/${meals.length}`}
            unit="CONCLUÍDAS"
            icon={Utensils}
            color="success"
          />
        </motion.div>

        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-gym-text-secondary uppercase tracking-[0.2em]">
              Refeições de hoje
            </h2>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={RefreshCw}
              onClick={handleRegenerate}
              disabled={loading}
            >
              {loading ? 'Gerando...' : 'Regenerar'}
            </Button>
          </div>

          <div className="space-y-2.5">
            {meals.map((meal) => (
              <Card key={meal.id} variant="default" padding="md" interactive>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      meal.completed
                        ? 'bg-gym-success/15'
                        : 'bg-gym-accent-muted'
                    }`}
                  >
                    <meal.icon
                      size={22}
                      strokeWidth={2.5}
                      className={meal.completed ? 'text-gym-success' : 'text-gym-accent'}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className={`font-bold text-base ${
                          meal.completed ? 'text-gym-text-secondary line-through' : 'text-gym-text-primary'
                        }`}
                      >
                        {meal.name}
                      </h3>
                      <Badge variant="neutral" size="sm">
                        {meal.time}
                      </Badge>
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-display impact-text text-xl gradient-text">
                        {meal.calories}
                      </span>
                      <span className="text-[10px] font-bold text-gym-text-muted uppercase tracking-wider">
                        kcal
                      </span>
                    </div>
                    <p className="text-xs text-gym-text-secondary mt-1 truncate">
                      {meal.items.join(' • ') || 'Sem itens definidos'}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-gym-text-muted flex-shrink-0" />
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Card variant="glass" className="relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-gym-accent/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative flex items-start gap-3">
              <div className="bg-gradient-to-br from-gym-accent to-gym-accent-hover p-2.5 rounded-xl shadow-glow-sm flex-shrink-0">
                <Lightbulb size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gym-accent text-sm uppercase tracking-wider">
                  Dica da IA
                </h3>
                <p className="text-xs text-gym-text-secondary mt-1.5 leading-relaxed">
                  {tip}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </PageShell>
  );
};

const mapObjectiveForDiet = (objective) => {
  const map = {
    hipertrofia: 'ganho_massa',
    emagrecimento: 'perda_gordura',
    forca: 'ganho_massa',
    resistencia: 'manutencao',
  };
  return map[objective] || objective || 'manutencao';
};

export default Diet;