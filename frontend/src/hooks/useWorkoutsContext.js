// Author: iamshaunjp
// Date: 9 june 2020
// Title of source code: Full React Tutorial - Programmatic Redirects
// Type: source code
// Web address: https://github.com/iamshaunjp/MERN-Stack-Tutorial/blob/lesson-11/frontend/src/hooks

import { WorkoutsContext } from "../context/WorkoutContext"
import { useContext } from "react"

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext)

  if(!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}