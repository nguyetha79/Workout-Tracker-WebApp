// Author: iamshaunjp
// Date: 15 June 2022
// Title of source code: MERN Authentication Tutorial - Making a useLogout Hook
// Type: source code
// Web address: https://github.com/iamshaunjp/MERN-Stack-Tutorial/blob/lesson-11/frontend/src/hooks/useLogout.js

import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };

  return { logout };
};
