import { getAllExercises } from '../data/exercises';
import { exercises as exercisesByCategory } from '../data/exercises';

/**
 * Normalize a string for matching: lowercase, trim, strip diacritics.
 */
const normalize = (s) =>
  (s || '')
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

/**
 * Find an exercise from `src/data/exercises.js` by its Portuguese name.
 * Strategy: exact match → contains match → reversed contains match.
 * Returns the exercise object (with videoEmbed, description, tips, muscles, etc.) or null.
 */
export const findExerciseByName = (name) => {
  if (!name) return null;
  const needle = normalize(name);
  if (!needle) return null;

  const all = getAllExercises();

  // 1) exact match
  let found = all.find((e) => normalize(e.name) === needle);
  if (found) return found;

  // 2) contains — needle is substring of an exercise name (e.g. "Crucifixo" -> "Crucifixo / Fly")
  found = all.find((e) => normalize(e.name).includes(needle));
  if (found) return found;

  // 3) reversed — exercise name is substring of needle (e.g. "Supino Reto com Halter" -> "Supino Reto")
  found = all.find((e) => needle.includes(normalize(e.name)));
  if (found) return found;

  return null;
};

/**
 * Map a category key (chest/back/legs/shoulders/biceps/triceps/core) to a friendly PT label.
 */
export const categoryLabel = {
  chest: 'Peito',
  back: 'Costas',
  legs: 'Pernas',
  shoulders: 'Ombros',
  biceps: 'Bíceps',
  triceps: 'Tríceps',
  core: 'Core',
};

/**
 * Given an exercise name, infer the muscle-group label by which category it lives in.
 * Falls back to 'Geral' when not found.
 */
export const getCategoryLabelForName = (name) => {
  const needle = normalize(name);
  if (!needle) return 'Geral';
  for (const [category, list] of Object.entries(exercisesByCategory)) {
    if (list.some((e) => normalize(e.name) === needle)) return categoryLabel[category] || category;
  }
  return 'Geral';
};
