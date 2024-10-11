import React, { useState, useEffect } from 'react';
import { getAllShoes, updateShoe, createShoe } from '../../Services/ShoeService';
import ShoesEditCard from './ShoesEditCard';
import ShoeEntryForm from './ShoesEntryForm';
import { useCurrentUser } from '../User/CurrentUser';

export const ShoesEditList = () => {
  const [shoes, setShoes] = useState([])
  const [selectedShoe, setSelectedShoe] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const currentUser = useCurrentUser()

  useEffect(() => {
    const fetchShoes = async () => {
      const shoesData = await getAllShoes()
      setShoes(shoesData)
    }
    fetchShoes()
  }, [])

  const handleShoeSelect = (e) => {
    const shoeId = e.target.value
    if (shoeId === 'new') {
      setIsAdding(true)
      setSelectedShoe(null)
      setIsEditing(false)
    } else {
      const shoe = shoes.find((s) => s.id === parseInt(shoeId));
      setSelectedShoe(shoe)
      setIsEditing(false)
      setIsAdding(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async (editedShoe) => {
    if (editedShoe.id) {
      const updatedShoe = await updateShoe(editedShoe)
      setShoes(shoes.map((s) => (s.id === updatedShoe.id ? updatedShoe : s)))
    } else {
      const newShoe = await createShoe(editedShoe)
      setShoes([...shoes, newShoe])
    }
    setSelectedShoe(editedShoe)
    setIsEditing(false)
    setIsAdding(false)
  }

  const handleCancel = () => {
    setIsEditing(false);
    setIsAdding(false);
    if (!selectedShoe?.id) {
      setSelectedShoe(null);
    }
  }

  return (
    <div>
      <h2>Edit Shoes</h2>
      <select onChange={handleShoeSelect} value={selectedShoe?.id || ''}>
        <option value="">Select a shoe</option>
        {shoes.map((shoe) => (
          <option key={shoe.id} value={shoe.id}>
            {shoe.name}
          </option>
        ))}
        <option value="new">Add new shoe</option>
      </select>

      {selectedShoe && !isEditing && !isAdding && (
        <div>
          <h3>{selectedShoe.name}</h3>
          <p>Date Added: {selectedShoe.dateAdded}</p>
          <p>Notes: {selectedShoe.notes}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}

      {isEditing && (
        <ShoesEditCard
          shoe={selectedShoe}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {isAdding && currentUser &&(
        <ShoeEntryForm
          onSave={handleSave}
          onCancel={handleCancel}
          currentUserId={currentUser.Id}
        />
      )}
    </div>
  )
}

export default ShoesEditList