import React, { useState } from 'react';

export const ShoesEditCard = ({ shoe, onSave, onCancel }) => {
  const [editedShoe, setEditedShoe] = useState(shoe)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedShoe({ ...editedShoe, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(editedShoe)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={editedShoe.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="dateAdded">Date Added:</label>
        <input
          type="date"
          id="dateAdded"
          name="dateAdded"
          value={editedShoe.dateAdded}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          name="notes"
          value={editedShoe.notes}
          onChange={handleInputChange}
          rows="4"
        />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  )
}

export default ShoesEditCard