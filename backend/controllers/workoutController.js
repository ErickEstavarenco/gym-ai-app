const pool = require("../config/db");

/* ─────────────────────────────────────────
   POST /api/workouts — criar treino
───────────────────────────────────────── */
const createWorkout = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ msg: "Nome do treino é obrigatório" });
    }

    const result = await pool.query(
      `INSERT INTO workouts (user_id, name)
       VALUES ($1, $2)
       RETURNING id, user_id, name, created_at`,
      [req.user.id, name.trim()]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error("CREATE WORKOUT ERROR:", err.message);
    res.status(500).json({ msg: "Erro interno do servidor" });
  }
};

/* ─────────────────────────────────────────
   GET /api/workouts — listar treinos
───────────────────────────────────────── */
const getWorkouts = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
         w.id,
         w.name,
         w.created_at,
         COUNT(e.id)::int AS exercise_count
       FROM workouts w
       LEFT JOIN exercises e ON e.workout_id = w.id
       WHERE w.user_id = $1
       GROUP BY w.id
       ORDER BY w.created_at DESC`,
      [req.user.id]
    );

    res.json(result.rows);

  } catch (err) {
    console.error("GET WORKOUTS ERROR:", err.message);
    res.status(500).json({ msg: "Erro interno do servidor" });
  }
};

/* ─────────────────────────────────────────
   DELETE /api/workouts/:id
───────────────────────────────────────── */
const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se pertence ao usuário
    const workout = await pool.query(
      "SELECT id FROM workouts WHERE id = $1 AND user_id = $2",
      [id, req.user.id]
    );

    if (workout.rows.length === 0) {
      return res.status(404).json({ msg: "Treino não encontrado" });
    }

    // Deleta exercícios primeiro (FK)
    await pool.query("DELETE FROM exercises WHERE workout_id = $1", [id]);

    // Deleta treino
    await pool.query("DELETE FROM workouts WHERE id = $1", [id]);

    res.json({ msg: "Treino deletado com sucesso" });

  } catch (err) {
    console.error("DELETE WORKOUT ERROR:", err.message);
    res.status(500).json({ msg: "Erro interno do servidor" });
  }
};

/* ─────────────────────────────────────────
   EXPORTS (MUITO IMPORTANTE)
───────────────────────────────────────── */
module.exports = {
  createWorkout,
  getWorkouts,
  deleteWorkout
};