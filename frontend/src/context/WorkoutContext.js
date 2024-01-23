// Author: iamshaunjp
// Date: 6 June 2022
// Title of source code: MERN Stack Tutorial - Adding React Context
// Type: source code
// Web address: https://github.com/iamshaunjp/MERN-Stack-Tutorial/blob/lesson-11/frontend/src/hooks

import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
    case "UPDATE_WORKOUT":
      const updateWorkout = action.payload;

      const updateWorkouts = state.workouts.map((workout) => {
        if (workout._id === updateWorkout._id) {
          return updateWorkout;
        }
        return workout;
      })  

      return {
          workouts : updateWorkouts      
      };

    case "SEARCH_WORKOUT":
      return {
        workouts: [...action.payload],
      };
    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
