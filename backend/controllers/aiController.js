const pool = require("../config/db");

/* ─────────────────────────────────────────
   POST /api/ai/generate-workout
   (VERSÃO MOCK — 100% GRATUITA)
───────────────────────────────────────── */
const generateWorkout = async (req, res) => {
  try {
    // 🔍 Busca usuário
    const profileResult = await pool.query(
      "SELECT name, weight, height, goal, level FROM users WHERE id = $1",
      [req.user.id]
    );

    const profile = profileResult.rows[0];

    if (!profile) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    // 🎯 Dados do treino (opcional sobrescrever via body)
    const goal = req.body.goal || profile.goal || "hipertrofia";
    const level = req.body.level || profile.level || "iniciante";

    // 🧠 MOCK de IA (simula resposta inteligente)
    const fakeResponses = [
      {
        name: `Treino A - Peito e Tríceps (${level})`,
        exercises: [
          { name: "Supino reto", sets: 4, reps: 10 },
          { name: "Supino inclinado", sets: 3, reps: 10 },
          { name: "Crucifixo", sets: 3, reps: 12 },
          { name: "Tríceps corda", sets: 3, reps: 12 },
        ],
      },
      {
        name: `Treino B - Costas e Bíceps (${level})`,
        exercises: [
          { name: "Puxada na frente", sets: 4, reps: 10 },
          { name: "Remada curvada", sets: 3, reps: 10 },
          { name: "Rosca direta", sets: 3, reps: 12 },
          { name: "Rosca martelo", sets: 3, reps: 12 },
        ],
      },
      {
        name: `Treino C - Pernas (${level})`,
        exercises: [
          { name: "Agachamento", sets: 4, reps: 8 },
          { name: "Leg press", sets: 4, reps: 10 },
          { name: "Cadeira extensora", sets: 3, reps: 12 },
          { name: "Panturrilha", sets: 4, reps: 15 },
        ],
      },
    ];

    // 🎲 escolhe aleatório
    const generated =
      fakeResponses[Math.floor(Math.random() * fakeResponses.length)];

    // ✅ validação
    if (!generated.name || !generated.exercises.length) {
      return res.status(500).json({ msg: "Erro ao gerar treino" });
    }

    // 💾 salva treino
    const workoutResult = await pool.query(
      `INSERT INTO workouts (user_id, name)
       VALUES ($1, $2)
       RETURNING id, name, created_at`,
      [req.user.id, generated.name]
    );

    const workout = workoutResult.rows[0];

    // 💪 salva exercícios
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

    // 🎉 resposta final
    return res.status(201).json({
      msg: "Treino gerado com sucesso",
      workout: {
        ...workout,
        exercises,
      },
    });

  } catch (err) {
    console.error("AI ERROR:", err);
    return res.status(500).json({
      msg: "Erro ao gerar treino",
    });
  }
};

module.exports = { generateWorkout };