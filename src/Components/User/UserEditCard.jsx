import React, { useState, useEffect } from 'react';
import { getUserById } from '../../Services/UserService'; 
import { useNavigate } from 'react-router-dom';
import './UserEditCard.css';

export const UserEditCard = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      setError(null)
      const storedUser = JSON.parse(localStorage.getItem('run_user'))
      if (storedUser && storedUser.id) {
        try {
          const userData = await getUserById(storedUser.id)
          setUser(userData)
        } catch (error) {
          console.error("Error fetching user data:", error)
          setError("Failed to fetch user data. Please try again later.")
        }
      } else {
        setError("No user data found in local storage.")
      }
      setLoading(false)
    }

    fetchUser()
  }, [])

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  
  const handleLogout = () => {
    localStorage.removeItem('run_user')
    navigate('/login')
  }

  if (loading) {
    return <div>Loading user data...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!user) {
    return <div>No user data available.</div>
  }

  return (
    <div className="user-edit-container">
      <div className="user-edit-content">
        <div className="user-card">
          <h2>User Profile</h2>
          <div className="user-info">
            <p><strong>Name:</strong> {user.name || 'N/A'}</p>
            <p><strong>Email:</strong> {user.email || 'N/A'}</p>
            <p><strong>Date of Birth:</strong> {formatDate(user.dob)}</p>
          </div>
          <button onClick={handleLogout} className="logout-button">Log Out</button>
        </div>
      </div>
    </div>
  )
}