import { useState, useEffect } from 'react';

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const localRunUser = localStorage.getItem('run_user')
    if (localRunUser) {
      const runUserObject = JSON.parse(localRunUser)
      console.log("Retrieved user from localStorage:", runUserObject)
      setCurrentUser(runUserObject)
    } else {
      console.log("No user found in localStorage")
    }
  }, [])

  return currentUser
}