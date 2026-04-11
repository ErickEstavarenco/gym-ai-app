Workoutroutes · JS
Copiar

const express = require("express");
const router = express.Router();
 
const auth = require("../middleware/auth");
const { createWorkout, getWorkouts, deleteWorkout } = require("../controllers/workoutController");
const { createExercise, getExercises, deleteExercise } = require("../controllers/exerciseController");
 
/* ─────────────────────────────────────────
   WORKOUT ROUTES
───────────────────────────────────────── */
router.post  ("/workouts",     auth, createWorkout);
router.get   ("/workouts",     auth, getWorkouts);
router.delete("/workouts/:id", auth, deleteWorkout);
 
/* ─────────────────────────────────────────
   EXERCISE ROUTES
───────────────────────────────────────── */
router.post  ("/exercises",              auth, createExercise);
router.get   ("/exercises/:workout_id",  auth, getExercises);
router.delete("/exercises/:id",          auth, deleteExercise);
 
module.exports = router;
 