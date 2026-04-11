const { OpenAI } = require("openai");
const pool = require("../config/db");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* ─────────────────────────────────────────
   HELPER — extrai JSON da resposta da IA
   Protege contra texto extra fora do JSON
───────────────────────────────────────── */
const extractJSON = (text) => {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("Resposta da IA não contém JSON válido");
  return JSON.parse(match[0]);
};

/* ─────────────────────────────────────────
   POST /api/ai/generate-workout
   Gera treino com IA e salva no banco
───────────────────────────────────────── */
const generateWorkout = async (req, res) => {
  try {
    // Busca perfil do usuário logado para enriquecer o prompt
    const profileResult = await pool.query(
      "SELECT name, weight, height, goal, level FROM users WHERE id = $1",
      [req.user.id]
    );

    const profile = profileResult.rows[0];

    // Permite sobrescrever goal/level pelo body (opcional)
    const goal  = req.body.goal  || profile.goal  || "hipertrofia";
    const level = req.body.level || profile.level || "iniciante";

    const prompt = `
Você é um personal trainer especialista. Crie um treino de academia completo para:

- Nome do aluno: ${profile.name}
- Objetivo: ${goal}
- Nível: ${level}
${profile.weight ? `- Peso: ${profile.weight}kg` : ""}
${profile.height ? `- Altura: ${profile.height}cm` : ""}

Regras:
- Entre 4 e 6 exercícios
- Séries entre 3 e 5
- Repetições entre 6 e 15
- Exercícios adequados ao nível informado

Responda SOMENTE com JSON puro, sem texto adicional, sem markdown, no formato:
{
  "name": "Nome do Treino",
  "exercises": [
    { "name": "Nome do exercício", "sets": 3, "reps": 10 },
    { "name": "Nome do exercício", "sets": 4, "reps": 8 }
  ]
}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const text = completion.choices[0].message.content;

    // ✅ Parse seguro — não quebra se a IA mandar texto extra
    let generated;
    try {
      generated = extractJSON(text);
    } catch (parseErr) {
      console.error("AI PARSE ERROR:", parseErr.message);
      console.error("AI RAW RESPONSE:", text);
      return res.status(500).json({ msg: "IA retornou formato inválido. Tente novamente." });
    }

    // Validação mínima do que a IA retornou
    if (!generated.name || !Array.isArray(generated.exercises) || generated.exercises.length === 0) {
      return res.status(500).json({ msg: "Treino gerado incompleto. Tente novamente." });
    }

    // ✅ Salva o treino no banco automaticamente
    const workoutResult = await pool.query(
      `INSERT INTO workouts (user_id, name)
       VALUES ($1, $2)
       RETURNING id, name, created_at`,
      [req.user.id, generated.name]
    );

    const workout = workoutResult.rows[0];

    // ✅ Salva cada exercício no banco
    const exercisePromises = generated.exercises.map((ex) =>
      pool.query(
        `INSERT INTO exercises (workout_id, name, sets, reps)
         VALUES ($1, $2, $3, $4)
         RETURNING id, name, sets, reps`,
        [workout.id, ex.name, ex.sets, ex.reps]
      )
    );

    const exerciseResults = await Promise.all(exercisePromises);
    const exercises = exerciseResults.map((r) => r.rows[0]);

    // Retorna treino completo já salvo
    res.status(201).json({
      msg: "Treino gerado e salvo com sucesso",
      workout: {
        ...workout,
        exercises,
      },
    });

  } catch (err) {
    console.error("AI ERROR:", err.message);
    res.status(500).json({ msg: "Erro ao gerar treino com IA" });
  }
};

module.exports = { generateWorkout };