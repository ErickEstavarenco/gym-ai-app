// Validação e serialização do perfil do usuário.
// Funções puras (sem banco), para poderem ser testadas isoladamente.

// Identificadores internos persistidos no banco. Os rótulos exibidos
// ("Massa", "Força"...) ficam só no frontend.
export const OBJECTIVES = ['hipertrofia', 'emagrecimento', 'forca', 'resistencia', 'definicao'];

const isEmpty = (value) => value === '' || value === null;

// Aceita número ou string numérica simples, com vírgula ou ponto ("1,75" / "1.75").
// Rejeita "1e2", "0x10", "-5", "abc" etc.
const toNumber = (value) => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : NaN;
  if (typeof value !== 'string') return NaN;
  const text = value.trim();
  if (!/^\d+(?:[.,]\d+)?$/.test(text)) return NaN;
  return Number(text.replace(',', '.'));
};

const round2 = (n) => Math.round(n * 100) / 100;

/**
 * Valida o corpo do PATCH /auth/profile.
 * - Só lê name, height, weight, age e objective (qualquer outro campo é ignorado).
 * - Campo ausente (undefined): não altera.
 * - Campo vazio ('' ou null): limpa o valor (grava null). Exceto `name`, que é obrigatório.
 * Retorna { updates } ou { error }.
 */
export const parseProfileUpdate = (body = {}) => {
  const { name, height, weight, age, objective } = body || {};
  const updates = {};

  if (name !== undefined) {
    if (typeof name !== 'string' || !name.trim() || name.trim().length > 100) {
      return { error: 'Nome inválido' };
    }
    updates.name = name.trim();
  }

  if (height !== undefined) {
    if (isEmpty(height)) {
      updates.height = null;
    } else {
      const n = toNumber(height);
      if (!Number.isFinite(n) || n < 0.5 || n > 2.8) {
        return { error: 'Altura inválida (use metros, ex.: 1,75)' };
      }
      updates.height = round2(n);
    }
  }

  if (weight !== undefined) {
    if (isEmpty(weight)) {
      updates.weight = null;
    } else {
      const n = toNumber(weight);
      if (!Number.isFinite(n) || n < 20 || n > 500) {
        return { error: 'Peso inválido (use kg)' };
      }
      updates.weight = round2(n);
    }
  }

  if (age !== undefined) {
    if (isEmpty(age)) {
      updates.age = null;
    } else {
      const n = toNumber(age);
      if (!Number.isInteger(n) || n < 13 || n > 120) {
        return { error: 'Idade inválida' };
      }
      updates.age = n;
    }
  }

  if (objective !== undefined) {
    if (isEmpty(objective)) {
      updates.objective = null;
    } else if (!OBJECTIVES.includes(objective)) {
      return { error: 'Objetivo inválido' };
    } else {
      updates.objective = objective;
    }
  }

  if (Object.keys(updates).length === 0) {
    return { error: 'Nenhum dado para atualizar' };
  }

  return { updates };
};

// O Postgres devolve DECIMAL como string ("1.75"); convertemos para número.
const toNumberOrNull = (value) =>
  value === null || value === undefined ? null : Number(value);

export const serializeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  height: toNumberOrNull(user.height),
  weight: toNumberOrNull(user.weight),
  age: user.age ?? null,
  objective: user.objective ?? null,
});