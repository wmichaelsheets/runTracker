import React, { useState } from 'react';
import { createShoe } from '../../Services/ShoeService';

export const ShoeEntryForm = ({ onSave, onCancel, currentUserId }) => {
  const [shoe, setShoe] = useState({
    name: '',
    added: new Date().toISOString().split('T')[0], 
    notes: '',
    retired: false,
    user_id: currentUserId
  })

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
      const shoeToSubmit = {
        ...shoe,
        retired: false,
        user_id: currentUserId
      }
      const newShoe = await createShoe(shoeToSubmit)
      onSave(newShoe)
    } catch (error) {
      console.error('Error creating shoe:', error)
     
    }
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
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  )
}

export default ShoeEntryForm