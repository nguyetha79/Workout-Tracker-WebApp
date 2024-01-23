// Author: iamshaunjp
// Date: 6 June 2022
// Title of source code: MERN Stack Tutorial - Models and Schemas
// Type: source code
// Web address: https://github.com/iamshaunjp/MERN-Stack-Tutorial/blob/lesson-5/backend/models

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    sets: {
      type: Number,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    restPeriods: {
      type: String,
      required: true,
    },
    tempo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
