const Workout = require("../models/WorkoutModel");
const mongoose = require("mongoose");

// Author: iamshaunjp
// Date: 6 June 2022
// Title of source code: MERN Stack Tutorial - Controllers
// Type: source code
// Web address: https://github.com/iamshaunjp/MERN-Stack-Tutorial/blob/lesson-6/backend/controllers

// get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id;

  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

// search workout title
const getTitle = async (req, res) => {
  const searchStr = req.query.title
  const user_id = req.user._id;
  console.log("in here")
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
  console.log("in here")
  const searchResults = []
  for(let i = 0; i < workouts.length; i++){
    if(workouts[i].title.indexOf(searchStr) != -1){
      searchResults.push(workouts[i])
    }
  }
  res.status(200).json(searchResults);
}

// get a single workout
const getWorkout = async (req, res) => {
  // const { id } = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  try {
    const workout = await Workout.findById(req.params.id);
    res.status(200).json(workout);
  } catch (error) {
    res.status(404).json({ error: "No such workout" });
  }
};

// Author: iamshaunjp
// Date: 6 June 2022
// Title of source code: MERN Stack Tutorial - Handling Error Responses
// Type: source code
// Web address: https://github.com/iamshaunjp/MERN-Stack-Tutorial/blob/lesson-13/backend/controllers

// create new workout
const createWorkout = async (req, res) => {
  const { title, type, sets, load, reps, restPeriods, tempo, description } =
    req.body;

  // add doc to db
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, type, sets, load, reps, restPeriods, tempo, description, user_id });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message});
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  try {
    const workout = await Workout.findOneAndDelete({ _id: id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(404).json({ error: "No such workout" });
  }
};


// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  console.log(req.body)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      {
        ...req.body
      }
    );
    res.status(200).json(workout);
  } catch (error) {
    res.status(404).json({ error: "No such workout" });
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
  getTitle,
};
