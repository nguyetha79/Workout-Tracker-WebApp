// Author: iamshaunjp
// Date: 15 June 2022
// Title of source code: MERN Authentication Tutorial - Making a useSignup Hook
// Type: source code
// Web address: https://github.com/iamshaunjp/MERN-Auth-Tutorial/blob/lesson-10/frontend/src/hooks/useSignup.js

import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (username, email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('https://workout-tracker-webapp.onrender.com/api/users/signup', {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}