import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../Services/UserService';

export const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const registerNewUser = async (event) => {
    event.preventDefault()
    try {
      const newUser = await createUser({ name, email })
      if (newUser) {
        localStorage.setItem('run_user', JSON.stringify(newUser))
        navigate('/runs/enter')
      }
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <form onSubmit={registerNewUser}>
      <h1>Please Register</h1>
      <fieldset>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
          required
        />
      </fieldset>
      <fieldset>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          required
        />
      </fieldset>
      <fieldset>
        <button type="submit">Register</button>
      </fieldset>
    </form>
  )
}