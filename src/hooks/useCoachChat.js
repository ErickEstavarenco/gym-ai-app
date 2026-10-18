import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Dumbbell, Utensils, TrendingUp, RotateCcw, Trophy } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWorkout } from '../context/WorkoutContext';
import { useAI } from './useAI';
import {
  buildInitialGreeting,
  buildErrorMessage,
  generateCoachResponse,
} from '../services/coachLogic';

/**
 * Hook único para o chat — usado tanto pelo FAB ChatBot quanto pela rota /chat.
 *
 * Responsabilidades:
 *   1. Manter `messages`, `isTyping`, `error`, `lastUserInput`.
 *   2. Processar `send(text)`:
 *      - Tenta o pipeline de IA (useAI → chatWithAI).
 *      - Se der erro, usa buildErrorMessage() com chip "Tentar novamente".
 *      - Fallback local (generateCoachResponse) é aplicado se a resposta
 *        vier vazia ou muito genérica.
 *   3. Processar `clickSuggestion(action, kind)`:
 *      - kind === 'text' → encaminha como mensagem.
 *      - kind === 'action' → executa: generate_workout, generate_diet, navigate_*, etc.
 *
 * StrictMode-safe: sempre usa `prev.map(...)` puro nas atualizações de
 * messages, igual ao fix do `+` em ActiveWorkout.
 */
export const useCoachChat = () => {
  const { user } = useAuth();
  const { userProfile, saveWorkout, saveDiet, updateUserProfile, setActiveSplit } = useWorkout();
  const ai = useAI();
  const navigate = useNavigate();

  const [messages, setMessages] = useState(() => [
    {
      id: 'init',
      type: 'bot',
      ...buildInitialGreeting(user, userProfile),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [lastUserInput, setLastUserInput] = useState('');

  // Mantém uma referência ao profile para usar em handlers sem precisar
  // re-listá-los (evita loop de useEffect).
  const profileRef = useRef(userProfile);
  useEffect(() => {
    profileRef.current = userProfile;
  }, [userProfile]);

  const addBotMessage = useCallback((payload) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `bot-${prev.length}-${Date.now()}`,
        type: 'bot',
        ...payload,
      },
    ]);
  }, []);

  const addUserMessage = useCallback((text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${prev.length}-${Date.now()}`,
        type: 'user',
        content: text,
      },
    ]);
  }, []);

  const send = useCallback(
    async (rawText) => {
      const text = (rawText || '').trim();
      if (!text) return;
      addUserMessage(text);
      setLastUserInput(text);
      setIsTyping(true);

      try {
        const result = await ai.sendMessage(text, { userProfile });
        const responseText = (result?.response || '').toString();
        const suggestionsFromAI = (result?.suggestions || []).map((label) => ({
          id: `sugg-${label}`,
          icon: 'Dumbbell',
          label,
          kind: 'text',
          action: label,
        }));

        // Se a IA/DEV responder vazio ou com um fallback muito genérico,
        // usamos o coach local com contexto do perfil.
        const looksLikeEmptyFallback =
          !responseText.trim() ||
          /entendi! 💪/i.test(responseText) ||
          responseText.length < 30;

        if (looksLikeEmptyFallback) {
          const coach = generateCoachResponse(text, { user, userProfile });
          addBotMessage(coach);
        } else {
          addBotMessage({
            content: responseText,
            suggestions: suggestionsFromAI,
          });
        }
      } catch (err) {
        // Se o backend falhou mas trouxe um fallback local, usamos; senão,
        // mensagem de erro amigável.
        const local = err?.__localFallback;
        if (local && local.response) {
          addBotMessage({
            content: local.response,
            suggestions: (local.suggestions || []).map((label) => ({
              id: `sugg-${label}`,
              icon: 'Dumbbell',
              label,
              kind: 'text',
              action: label,
            })),
          });
        } else {
          addBotMessage(buildErrorMessage(err));
        }
      } finally {
        setIsTyping(false);
      }
    },
    [addBotMessage, addUserMessage, ai, user, userProfile]
  );

  const clickSuggestion = useCallback(
    async (rawActionOrLabel, kind = 'text') => {
      // Se for texto puro (label puro), encaminha como mensagem
      if (kind === 'text' || !rawActionOrLabel) {
        return send(rawActionOrLabel);
      }

      switch (rawActionOrLabel) {
        case 'generate_workout': {
          setIsTyping(true);
          try {
            const workout = await ai.generateNewWorkout(profileRef.current);
            const saved = saveWorkout(workout);
            const numDays = workout.days?.length || 0;
            addBotMessage({
              content: `✅ Treino gerado!\n\n📋 **${saved.title}**\n📅 ${numDays} dia(s) de treino\n🎯 Foco: ${saved.objective}\n\nSalvei no seu histórico. Bora começar?`,
              suggestions: [
                { id: 'gw_go', icon: 'ArrowRight', label: 'Iniciar treino', kind: 'action', action: 'navigate_workout' },
                { id: 'gw_diet', icon: 'Utensils', label: 'Montar dieta', kind: 'action', action: 'generate_diet' },
              ],
            });
          } catch (err) {
            addBotMessage(buildErrorMessage(err));
          } finally {
            setIsTyping(false);
          }
          return;
        }

        case 'generate_diet': {
          setIsTyping(true);
          try {
            // O gerador de dieta precisa de objetivo + calorias. Mapeamos o
            // objetivo do profile (hipertrofia -> ganho_massa, etc.).
            const adaptedProfile = adaptProfileForDiet(profileRef.current);
            const diet = await ai.generateNewDiet(adaptedProfile);
            const saved = saveDiet(diet);
            const macros = saved.macros || {};
            addBotMessage({
              content: `✅ Dieta gerada!\n\n📋 **${saved.title}**\n🔥 ${saved.dailyCalories} kcal/dia\n💪 Proteína: ${macros.protein || '—'}g\n🍞 Carbs: ${macros.carbs || '—'}g\n🥑 Gordura: ${macros.fat || '—'}g\n\nSalvei no seu histórico. Quer ver?`,
              suggestions: [
                { id: 'gd_view', icon: 'ArrowRight', label: 'Ver dieta', kind: 'action', action: 'navigate_diet' },
                { id: 'gd_workout', icon: 'Dumbbell', label: 'Criar treino', kind: 'action', action: 'generate_workout' },
              ],
            });
          } catch (err) {
            addBotMessage(buildErrorMessage(err));
          } finally {
            setIsTyping(false);
          }
          return;
        }

        case 'generate_full_plan': {
          setIsTyping(true);
          try {
            const [workout, diet] = await Promise.all([
              ai.generateNewWorkout(profileRef.current),
              ai.generateNewDiet(adaptProfileForDiet(profileRef.current)),
            ]);
            const savedW = saveWorkout(workout);
            const savedD = saveDiet(diet);
            addBotMessage({
              content: `🎉 Plano completo gerado!\n\n✅ Treino: **${savedW.title}** (${savedW.days?.length || 0} dia(s))\n✅ Dieta: **${savedD.title}** (${savedD.dailyCalories} kcal/dia)\n\nAmbos foram salvos. Quer começar?`,
              suggestions: [
                { id: 'fp_workout', icon: 'Dumbbell', label: 'Iniciar treino', kind: 'action', action: 'navigate_workout' },
                { id: 'fp_diet', icon: 'Utensils', label: 'Ver dieta', kind: 'action', action: 'navigate_diet' },
                { id: 'fp_stats', icon: 'TrendingUp', label: 'Ver progresso', kind: 'action', action: 'navigate_stats' },
              ],
            });
          } catch (err) {
            addBotMessage(buildErrorMessage(err));
          } finally {
            setIsTyping(false);
          }
          return;
        }

        case 'navigate_stats':
          navigate('/stats');
          return;
        case 'navigate_workout':
          navigate('/workout');
          return;
        case 'navigate_diet':
          navigate('/diet');
          return;

        case 'set_objective_hipertrofia':
          updateUserProfile({ objective: 'hipertrofia' });
          addBotMessage({
            content: '✅ Objetivo atualizado pra **hipertrofia**. Bora gerar um treino agora?',
            suggestions: [
              { id: 'soh_w', icon: 'Zap', label: 'Gerar treino', kind: 'action', action: 'generate_workout' },
            ],
          });
          return;
        case 'set_objective_emagrecimento':
          updateUserProfile({ objective: 'emagrecimento' });
          addBotMessage({
            content: '✅ Objetivo atualizado pra **emagrecimento**. Bora gerar um treino agora?',
            suggestions: [
              { id: 'soe_w', icon: 'Activity', label: 'Gerar treino', kind: 'action', action: 'generate_workout' },
            ],
          });
          return;
        case 'set_objective_forca':
          updateUserProfile({ objective: 'forca' });
          addBotMessage({
            content: '✅ Objetivo atualizado pra **força**. Bora gerar um treino agora?',
            suggestions: [
              { id: 'sof_w', icon: 'Zap', label: 'Gerar treino', kind: 'action', action: 'generate_workout' },
            ],
          });
          return;
        case 'set_objective_massa':
          updateUserProfile({ objective: 'ganho_massa' });
          addBotMessage({
            content: '✅ Objetivo atualizado pra **ganho de massa**. Quer que eu monte a dieta?',
            suggestions: [
              { id: 'som_d', icon: 'Zap', label: 'Gerar dieta', kind: 'action', action: 'generate_diet' },
            ],
          });
          return;
        case 'set_objective_cut':
          updateUserProfile({ objective: 'perda_gordura' });
          addBotMessage({
            content: '✅ Objetivo atualizado pra **perda de gordura**. Quer que eu monte a dieta?',
            suggestions: [
              { id: 'soc_d', icon: 'Zap', label: 'Gerar dieta', kind: 'action', action: 'generate_diet' },
            ],
          });
          return;
        case 'set_objective_keep':
          updateUserProfile({ objective: 'manutencao' });
          addBotMessage({
            content: '✅ Objetivo atualizado pra **manutenção**. Quer que eu monte a dieta?',
            suggestions: [
              { id: 'sok_d', icon: 'Zap', label: 'Gerar dieta', kind: 'action', action: 'generate_diet' },
            ],
          });
          return;

        // Splits de treino (C5)
        case 'split_A':
        case 'split_B':
        case 'split_C': {
          const id = rawActionOrLabel.replace('split_', '');
          setActiveSplit && setActiveSplit(id);
          addBotMessage({
            content: `🔁 Split **${id}** ativado. Abrindo a tela de treino agora.`,
            suggestions: [
              { id: 'sa_go', icon: 'ArrowRight', label: 'Ir para treino', kind: 'action', action: 'navigate_workout' },
              { id: 'sa_back', icon: 'RotateCcw', label: 'Voltar', kind: 'text', action: 'voltar' },
            ],
          });
          navigate('/workout');
          return;
        }

        case 'retry': {
          if (lastUserInput) {
            return send(lastUserInput);
          }
          addBotMessage({
            content: 'Tudo pronto. O que vamos fazer agora?',
            suggestions: [
              { id: 'r_w', icon: 'Dumbbell', label: 'Gerar treino', kind: 'action', action: 'generate_workout' },
            ],
          });
          return;
        }

        default:
          // Fallback — encaminha como texto livre
          return send(rawActionOrLabel);
      }
    },
    [addBotMessage, ai, lastUserInput, navigate, saveDiet, saveWorkout, send, setActiveSplit, updateUserProfile]
  );

  const clear = useCallback(() => {
    setMessages([
      {
        id: 'init',
        type: 'bot',
        ...buildInitialGreeting(user, userProfile),
      },
    ]);
    setLastUserInput('');
    ai.clearHistory();
  }, [ai, user, userProfile]);

  return {
    messages,
    isTyping: isTyping || ai.loading,
    error: ai.error,
    send,
    clickSuggestion,
    clear,
  };
};

/**
 * Adapta o profile no shape de `useWorkout` para o shape que
 * `generateNewDiet` espera (`ganho_massa` / `perda_gordura` / `manutencao`).
 * Sem isso, gerar dieta a partir do profile "hipertrofia" falhava.
 */
const adaptProfileForDiet = (profile = {}) => {
  const map = {
    hipertrofia: 'ganho_massa',
    emagrecimento: 'perda_gordura',
    forca: 'ganho_massa',
    resistencia: 'manutencao',
  };
  const objective = map[profile.objective] || profile.objective || 'manutencao';
  return {
    ...profile,
    objective,
    dailyCalories:
      profile.dailyCalories ||
      (objective === 'ganho_massa' ? 3000 : objective === 'perda_gordura' ? 2000 : 2500),
    mealsPerDay: profile.mealsPerDay || 5,
  };
};

// Re-export para que páginas possam resolver o ícone se precisarem
export { ArrowRight, Dumbbell, Utensils, TrendingUp, RotateCcw, Trophy };

export default useCoachChat;
