import React, { useState, useEffect } from 'react';
import { NavBar } from '../NavBar/NavBar';
import { getUserById } from '../../Services/UserService'; 
import './UserEditCard.css';

export const UserEditCard = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    dob: ''
  })

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem('run_user'))
      if (storedUser && storedUser.id) {
        const userData = await getUserById(storedUser.id)
        setUser(userData)
      }
    }

    fetchUser();
  }, [])

  return (
    <div className="user-edit-container">
      <NavBar />
      <div className="user-edit-content">
        <div className="user-card">
          <h2>User Profile</h2>
          <div className="user-info">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Date of Birth:</strong> {user.dob}</p>
          </div>
        </div>
      </div>
    </div>
  )
}