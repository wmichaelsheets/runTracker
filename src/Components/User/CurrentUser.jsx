import { useState, useEffect } from 'react';

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const userJson = localStorage.getItem('run_user');
    if (userJson) {
      setCurrentUser(JSON.parse(userJson));
    }
  }, [])

  return currentUser
}