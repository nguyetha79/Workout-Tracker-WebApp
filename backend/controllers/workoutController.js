const Workout = require("../models/WorkoutModel");
const mongoose = require("mongoose");

// get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id;

  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

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

// create new workout
const createWorkout = async (req, res) => {
  const { title, type, sets, load, reps, restPeriods, tempo, description } =
    req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  if (!type) {
    emptyFields.push("type");
  }

  if (!sets) {
    emptyFields.push("sets");
  }

  if (!load) {
    emptyFields.push("load");
  }

  if (!reps) {
    emptyFields.push("reps");
  }

  if (!restPeriods) {
    emptyFields.push("restPeriods");
  }

  if (!tempo) {
    emptyFields.push("tempo");
  }

  if (!description) {
    emptyFields.push("description");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, type, sets, load, reps, restPeriods, tempo, description, user_id });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
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

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
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
};
