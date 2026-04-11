const pool = require("../config/db");

/* ─────────────────────────────────────────
   POST /api/exercises — adicionar exercício
───────────────────────────────────────── */
const createExercise = async (req, res) => {
  try {
    const { workout_id, name, sets, reps } = req.body;

    // Validação de campos obrigatórios
    if (!workout_id || !name || sets === undefined || reps === undefined) {
      return res.status(400).json({ msg: "workout_id, nome, séries e repetições são obrigatórios" });
    }

    // Validação de números positivos
    if (sets <= 0 || reps <= 0) {
      return res.status(400).json({ msg: "Séries e repetições devem ser maiores que zero" });
    }

    if (!Number.isInteger(Number(sets)) || !Number.isInteger(Number(reps))) {
      return res.status(400).json({ msg: "Séries e repetições devem ser números inteiros" });
    }

    // Confirma que o treino pertence ao usuário logado
    const workout = await pool.query(
      "SELECT id FROM workouts WHERE id = $1 AND user_id = $2",
      [workout_id, req.user.id]
    );

    if (workout.rows.length === 0) {
      return res.status(404).json({ msg: "Treino não encontrado" });
    }

    const result = await pool.query(
      `INSERT INTO exercises (workout_id, name, sets, reps)
       VALUES ($1, $2, $3, $4)
       RETURNING id, workout_id, name, sets, reps`,
      [workout_id, name.trim(), Number(sets), Number(reps)]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error("CREATE EXERCISE ERROR:", err.message);
    res.status(500).json({ msg: "Erro interno do servidor" });
  }
};

/* ─────────────────────────────────────────
   GET /api/exercises/:workout_id
───────────────────────────────────────── */
const getExercises = async (req, res) => {
  try {
    const { workout_id } = req.params;

    // Confirma que o treino pertence ao usuário logado
    const workout = await pool.query(
      "SELECT id FROM workouts WHERE id = $1 AND user_id = $2",
      [workout_id, req.user.id]
    );

    if (workout.rows.length === 0) {
      return res.status(404).json({ msg: "Treino não encontrado" });
    }

    const result = await pool.query(
      `SELECT id, workout_id, name, sets, reps
       FROM exercises
       WHERE workout_id = $1
       ORDER BY id ASC`,
      [workout_id]
    );

    res.json(result.rows);

  } catch (err) {
    console.error("GET EXERCISES ERROR:", err.message);
    res.status(500).json({ msg: "Erro interno do servidor" });
  }
};

/* ─────────────────────────────────────────
   DELETE /api/exercises/:id
───────────────────────────────────────── */
const deleteExercise = async (req, res) => {
  try {
    const { id } = req.params;

    // Confirma ownership via JOIN
    const exercise = await pool.query(
      `SELECT e.id FROM exercises e
       JOIN workouts w ON w.id = e.workout_id
       WHERE e.id = $1 AND w.user_id = $2`,
      [id, req.user.id]
    );

    if (exercise.rows.length === 0) {
      return res.status(404).json({ msg: "Exercício não encontrado" });
    }

    await pool.query("DELETE FROM exercises WHERE id = $1", [id]);

    res.json({ msg: "Exercício removido com sucesso" });

  } catch (err) {
    console.error("DELETE EXERCISE ERROR:", err.message);
    res.status(500).json({ msg: "Erro interno do servidor" });
  }
};

module.exports = { createExercise, getExercises, deleteExercise };