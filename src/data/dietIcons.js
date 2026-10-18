/**
 * Mapear tipo de refeição (string PT) -> ícone lucide.
 * Mantém o visual da tela /diet consistente com o layout antigo
 * (que usava um `icon` por refeição).
 */
import { Sun, Coffee, Utensils, Moon, Lightbulb } from 'lucide-react';

const MAP = {
  'café da manhã': Sun,
  'cafe da manha': Sun,
  breakfast: Sun,
  'lanche da manhã': Coffee,
  'lanche da manha': Coffee,
  morning_snack: Coffee,
  almoço: Utensils,
  almoco: Utensils,
  lunch: Utensils,
  'lanche da tarde': Coffee,
  afternoon_snack: Coffee,
  jantar: Moon,
  dinner: Moon,
  default: Utensils,
};

export const mealIconFor = (name = '') => {
  const key = name.toLowerCase();
  return MAP[key] || MAP.default;
};