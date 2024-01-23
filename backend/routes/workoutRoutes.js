// Author: iamshaunjp
// Date: 6 June 2022
// Title of source code: MERN Stack Tutorial - Controllers
// Type: source code
// Web address: https://github.com/iamshaunjp/MERN-Stack-Tutorial/blob/lesson-6/backend/controllers

const express = require("express");
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
  getTitle,
} = require("../controllers/workoutController");

// Author: iamshaunjp
// Date: 15 June 2022
// Title of source code: MERN Authentication Tutorial - Protecting API Routes
// Type: source code
// Web address: https://github.com/iamshaunjp/MERN-Auth-Tutorial/blob/lesson-14/backend/controllers
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth)

// GET searched string
router.get("/search", getTitle);

// GET all workouts
router.get("/", getWorkouts);

// GET a single workout
router.get("/:id", getWorkout);

// POST a new workout
router.post("/", createWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

// UPDATE a workout
router.put("/:id", updateWorkout);

module.exports = router;
