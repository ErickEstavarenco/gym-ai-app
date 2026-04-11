const express = require("express");
const router = express.Router();
 
const auth = require("../middleware/auth");
const { generateWorkout } = require("../controllers/aiController");
 
router.post("/ai/generate-workout", auth, generateWorkout);
 
module.exports = router;
 