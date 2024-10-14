import React, { useState, useEffect } from 'react';
import { getUserById } from '../../Services/UserService';
import { formatDate } from '../utils/dateUtils';
import logo from '../../assets/run-tracker-logo.png';
import './HomePage.css';

export const HomePage = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem('run_user'))
      if (storedUser && storedUser.id) {
        try {
          const userData = await getUserById(storedUser.id)
          setCurrentUser(userData)
        } catch (error) {
          console.error("Error fetching user data:", error)
        }
      }
      setLoading(false)
    }

    fetchUserData()
  }, [])

  if (loading) {
    return <div>Loading user data...</div>
  }

  if (!currentUser) {
    return <div>Unable to load user data. Please try logging in again.</div>
  }

  return (
    <div className="home-page">
      <img src={logo} alt="Run Tracker Logo" className="logo" />
      <h1>Welcome to Run Tracker, {currentUser.name}!</h1>
      <p>You've been a member since {formatDate(currentUser.created_at)}</p>
      <div className="instructions">
        <h2>Getting Started</h2>
        <ol>
          <li>
            Add your running shoes in the "Shoes" section
            <br />
            <small>Tip: Start here if this is your first time using Run Tracker</small>
          </li>
          <li>Enter your runs in the "Enter A Run" section</li>
          <li>View your running stats and progress over time</li>
        </ol>
      </div>
      <p>Happy running!</p>
    </div>
  )
}