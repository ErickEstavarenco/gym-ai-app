import {
  Dumbbell,
  Utensils,
  TrendingUp,
  Calendar,
  Flame,
  Zap,
  Activity,
  HeartPulse,
  CheckCircle,
  ArrowRight,
  RefreshCw,
  Trophy,
} from 'lucide-react';

/**
 * Pure functions used by the unified chat hook (useCoachChat).
 *
 * Two responsibilities:
 *   1. Generate contextual bot replies in PT (used when DEV_MODE responds
 *      locally, when the OpenAI key is missing/401, or before the user has
 *      any data in WorkoutContext).
 *   2. Expose icon components for suggestion chips — the unified hook must
 *      produce both `content` and `suggestions` in one shape, but
 *      `chatWithAI` on the AI service only returns a string. The chip icons
 *      live here so both the local fallback and the action dispatcher share
 *      a single registry.
 */

const SUGGESTION_ICONS = {
  Dumbbell,
  Utensils,
  TrendingUp,
  Calendar,
  Flame,
  Zap,
  Activity,
  HeartPulse,
  CheckCircle,
  ArrowRight,
  RefreshCw,
  Trophy,
};

export const buildIcon = (name) => SUGGESTION_ICONS[name] || Dumbbell;

/**
 * Resolve um campo `icon` (string OU componente React) em um componente
 * React pronto para renderizar. Usado pelo ChatPanel ao pintar chips de
 * sugestão — assim tanto o shape novo (string) quanto o legado (componente
 * direto) funcionam sem quebrar.
 */
export const resolveSuggestionIcon = (icon) => {
  if (!icon) return Dumbbell;
  if (typeof icon === 'string') return SUGGESTION_ICONS[icon] || Dumbbell;
  if (typeof icon === 'function' || typeof icon === 'object') return icon;
  return Dumbbell;
};

/**
 * Wraps the existing aiService.js local fallback. We keep using its keyword
 * matcher because it already covers greetings/workout/diet/progress/motivation
 * in PT-BR — wrapping it lets us upgrade the copy (add user name, profile
 * hints) instead of duplicating the keyword logic.
 *
 * If you ever need to bypass aiService (for tests), import the raw
 * `generateLocalChatResponse` directly.
 */
export { generateLocalChatResponse } from './aiService';

const firstNameOf = (user) => {
  const raw = user?.name || user?.email?.split('@')?.[0] || 'atleta';
  return raw.split(' ')[0];
};

const formatGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
};

export const buildInitialGreeting = (user, profile) => {
  const firstName = firstNameOf(user);
  const greeting = formatGreeting();
  const focusLine = profile?.objective
    ? `Seu foco atual é **${profile.objective}** — vou puxar por aí. `
    : '';
  return {
    content: `${greeting}, ${firstName}! 💪 Sou seu Personal Trainer digital.\n\n${focusLine}O que vamos fazer hoje?`,
    suggestions: [
      { id: 'init_generate_workout', icon: 'Dumbbell', label: 'Gerar treino agora', kind: 'action', action: 'generate_workout' },
      { id: 'init_generate_diet', icon: 'Utensils', label: 'Montar dieta', kind: 'action', action: 'generate_diet' },
      { id: 'init_progress', icon: 'TrendingUp', label: 'Ver progresso', kind: 'action', action: 'navigate_stats' },
    ],
  };
};

/**
 * Build a friendly error message based on the failed response status / code.
 * Used by useCoachChat as the message rendered after any backend failure.
 *
 * The categories follow what axios + the dev backend can throw today:
 *   401 → invalid/missing API key (OpenAI side)
 *   500/502/503 → backend up but failing
 *   ECONNABORTED → axios timeout
 *   ERR_NETWORK → CORS / offline / server down
 */
export const buildErrorMessage = (error) => {
  const status = error?.response?.status;
  const code = error?.code;
  const isTimeout = code === 'ECONNABORTED' || /timeout/i.test(error?.message || '');
  const isNetwork = code === 'ERR_NETWORK' || (!status && !isTimeout);

  if (status === 401) {
    return {
      content:
        '🔌 Estou sem conexão com a IA agora (a chave da OpenAI não respondeu). Sem problema — posso te ajudar com respostas locais que cobrem treino, dieta e progresso.',
      suggestions: [
        { id: 'err_retry', icon: 'RefreshCw', label: 'Tentar novamente', kind: 'action', action: 'retry' },
        { id: 'err_offline_w', icon: 'Dumbbell', label: 'Gerar treino agora', kind: 'action', action: 'generate_workout' },
      ],
    };
  }
  if (isTimeout) {
    return {
      content: '⏱️ Conexão lenta com o servidor. Tente de novo em alguns segundos.',
      suggestions: [
        { id: 'err_retry', icon: 'RefreshCw', label: 'Tentar de novo', kind: 'action', action: 'retry' },
      ],
    };
  }
  if (isNetwork) {
    return {
      content:
        '📡 Não consegui falar com o servidor agora. Vou responder localmente enquanto isso.',
      suggestions: [
        { id: 'err_retry', icon: 'RefreshCw', label: 'Tentar novamente', kind: 'action', action: 'retry' },
      ],
    };
  }
  return {
    content: '⚠️ Algo deu errado do meu lado. Quer tentar de novo?',
    suggestions: [
      { id: 'err_retry', icon: 'RefreshCw', label: 'Tentar novamente', kind: 'action', action: 'retry' },
    ],
  };
};

const summarizeResponse = (raw, ctx) => {
  if (!raw) return '';
  const firstName = firstNameOf(ctx?.user);
  // Replace generic "Sou seu assistente pessoal Gym AI" with a more PT-flavored greeting.
  if (raw.includes('assistente pessoal Gym AI')) {
    return raw.replace(
      /Olá! 💪 Sou seu assistente pessoal Gym AI![\s\S]*?O que você gostaria de fazer hoje\?/,
      `${formatGreeting()}, ${firstName}! 💪 Sou seu Personal Trainer digital.\n\nEstou aqui pra te ajudar com treino, dieta e progresso. O que vamos fazer hoje?`
    );
  }
  return raw;
};

/**
 * Local coach response, contextualized.
 *
 * Returns { content, suggestions } in the same shape as buildInitialGreeting.
 * Always uses `icon` as a *string* (icon name) — the hook resolves to a real
 * component before passing to ChatPanel.
 */
export const generateCoachResponse = (input, context = {}) => {
  const lower = (input || '').toLowerCase().trim();
  const firstName = firstNameOf(context.user);
  const profile = context.userProfile;

  // Cumprimentos
  if (/^(oi|olá|ola|eai|hey|bom dia|boa tarde|boa noite|opa|salve|fala|e aí)/.test(lower)) {
    return {
      content: `${formatGreeting()}, ${firstName}! 💪\n\n${profile?.objective ? `Seu foco atual é **${profile.objective}**. ` : ''}Pronto pra mais um treino?`,
      suggestions: [
        { id: 'g_generate_workout', icon: 'Dumbbell', label: 'Gerar treino', kind: 'action', action: 'generate_workout' },
        { id: 'g_generate_diet', icon: 'Utensils', label: 'Montar dieta', kind: 'action', action: 'generate_diet' },
        { id: 'g_progress', icon: 'TrendingUp', label: 'Ver progresso', kind: 'action', action: 'navigate_stats' },
      ],
    };
  }

  // Treino
  if (
    lower.includes('treino') ||
    lower.includes('exercício') ||
    lower.includes('exercicio') ||
    lower.includes('musculação') ||
    lower.includes('academia')
  ) {
    return {
      content: `Boa, ${firstName}! 🏋️ Vou montar um treino ${profile?.objective ? `focado em **${profile.objective}**` : 'personalizado pra você'}.\n\nQuer que eu gere agora ou prefere ajustar algo (objetivo, dias por semana, nível)?`,
      suggestions: [
        { id: 'w_now', icon: 'Zap', label: 'Gerar agora', kind: 'action', action: 'generate_workout' },
        { id: 'w_obj_hiper', icon: 'Flame', label: 'Hipertrofia', kind: 'action', action: 'set_objective_hipertrofia' },
        { id: 'w_obj_ema', icon: 'Activity', label: 'Emagrecer', kind: 'action', action: 'set_objective_emagrecimento' },
        { id: 'w_obj_forca', icon: 'Zap', label: 'Força', kind: 'action', action: 'set_objective_forca' },
      ],
    };
  }

  // Dieta
  if (
    lower.includes('dieta') ||
    lower.includes('alimentação') ||
    lower.includes('alimentacao') ||
    lower.includes('comida') ||
    lower.includes('nutrição') ||
    lower.includes('nutricao') ||
    lower.includes('refeição') ||
    lower.includes('refeicao') ||
    lower.includes('caloria')
  ) {
    return {
      content: `Plano alimentar é 70% do resultado, ${firstName}. 🥗\n\nQuer que eu monte agora com base no seu objetivo (${profile?.objective || 'defina um'})?`,
      suggestions: [
        { id: 'd_now', icon: 'Zap', label: 'Gerar dieta', kind: 'action', action: 'generate_diet' },
        { id: 'd_massa', icon: 'Flame', label: 'Ganhar massa', kind: 'action', action: 'set_objective_massa' },
        { id: 'd_cut', icon: 'Activity', label: 'Perder gordura', kind: 'action', action: 'set_objective_cut' },
        { id: 'd_keep', icon: 'CheckCircle', label: 'Manter peso', kind: 'action', action: 'set_objective_keep' },
      ],
    };
  }

  // Progresso
  if (
    lower.includes('progresso') ||
    lower.includes('resultado') ||
    lower.includes('evolução') ||
    lower.includes('evolucao') ||
    lower.includes('estatística') ||
    lower.includes('estatistica')
  ) {
    return {
      content: '📈 Vou abrir suas estatísticas atualizadas.',
      suggestions: [
        { id: 'p_stats', icon: 'ArrowRight', label: 'Abrir estatísticas', kind: 'action', action: 'navigate_stats' },
      ],
    };
  }

  // Motivação
  if (
    lower.includes('motiv') ||
    lower.includes('desan') ||
    lower.includes('cansado') ||
    lower.includes('difícil') ||
    lower.includes('dificil') ||
    lower.includes('desist')
  ) {
    return {
      content: `Ei, ${firstName} — todo mundo tem dias difíceis. O que separa quem avança é aparecer mesmo quando não tá a fim.\n\nQue tal um treino curto hoje? 30 min já conta. Bora?`,
      suggestions: [
        { id: 'm_quick', icon: 'Zap', label: 'Treino rápido', kind: 'action', action: 'generate_workout' },
        { id: 'm_stats', icon: 'TrendingUp', label: 'Ver meu progresso', kind: 'action', action: 'navigate_stats' },
      ],
    };
  }

  // Trocar de treino (split A/B/C)
  if (
    lower.includes('trocar') && (lower.includes('treino') || lower.includes('split')) ||
    /split [abc]/.test(lower) ||
    lower.includes('hoje é dia de') ||
    lower.includes('hoje e dia de') ||
    lower.includes('mudar treino')
  ) {
    return {
      content: '🔁 Posso mudar o split ativo pra você. Qual quer hoje?',
      suggestions: [
        { id: 's_a', icon: 'Dumbbell', label: 'Split A — Peito & Tríceps', kind: 'action', action: 'split_A' },
        { id: 's_b', icon: 'Dumbbell', label: 'Split B — Costas & Bíceps', kind: 'action', action: 'split_B' },
        { id: 's_c', icon: 'Dumbbell', label: 'Split C — Pernas & Ombros', kind: 'action', action: 'split_C' },
      ],
    };
  }

  // Plano completo
  if (lower.includes('plano completo') || lower.includes('treino + dieta') || lower.includes('treino e dieta')) {
    return {
      content: `Bora montar tudo de uma vez, ${firstName}? 💥`,
      suggestions: [
        { id: 'fp_go', icon: 'Trophy', label: 'Gerar plano completo', kind: 'action', action: 'generate_full_plan' },
      ],
    };
  }

  // Fallback: contextual, não o default genérico antigo
  const snippet = input.slice(0, 50);
  const ellipsis = input.length > 50 ? '...' : '';
  return {
    content: `Hmm, não tenho certeza do que você quer dizer com "${snippet}${ellipsis}".\n\n${profile?.objective ? `Sei que seu foco atual é **${profile.objective}**. ` : ''}Posso te ajudar com isso ou:`,
    suggestions: [
      { id: 'f_w', icon: 'Dumbbell', label: 'Gerar treino', kind: 'action', action: 'generate_workout' },
      { id: 'f_d', icon: 'Utensils', label: 'Gerar dieta', kind: 'action', action: 'generate_diet' },
      { id: 'f_p', icon: 'TrendingUp', label: 'Ver progresso', kind: 'action', action: 'navigate_stats' },
    ],
  };
};

export { summarizeResponse };
