import React, { useState } from 'react';
import { createShoe } from '../../Services/ShoeService';
import { useCurrentUser } from '../User/CurrentUser';

export const ShoeEntryForm = ({ onSave, onCancel }) => {
  const currentUser = useCurrentUser()
  const initialShoeState = {
    name: '',
    added: new Date().toISOString().split('T')[0], 
    notes: '',
    retired: false,
    user_id: currentUser ? currentUser.id : null
  }

  const [shoe, setShoe] = useState(initialShoeState)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShoe(prevShoe => ({
      ...prevShoe,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!currentUser) {
        console.error('No user is logged in')
        return
      }
      const shoeToSubmit = {
        ...shoe,
        retired: false,
        user_id: currentUser.id
      }
      const newShoe = await createShoe(shoeToSubmit)
      onSave(newShoe)
      
      
      setShoe(initialShoeState)
    } catch (error) {
      console.error('Error creating shoe:', error)
    }
  }

  const handleCancel = () => {
    
    setShoe(initialShoeState)
    
    if (onCancel) {
      onCancel()
    }
  }

  if (!currentUser) {
    return <div>Please log in to add a shoe.</div>
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Shoe</h3>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={shoe.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="added">Date Added:</label>
        <input
          type="date"
          id="added"
          name="added"
          value={shoe.added}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          name="notes"
          value={shoe.notes}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  )
}

export default ShoeEntryForm