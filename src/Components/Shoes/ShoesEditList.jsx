import React, { useState, useEffect } from 'react';
import { getAllShoes, updateShoe, createShoe } from '../../Services/ShoeService';
import ShoesEditCard from './ShoesEditCard';

export const ShoesEditList = () => {
  const [shoes, setShoes] = useState([]);
  const [selectedShoe, setSelectedShoe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchShoes = async () => {
      const shoesData = await getAllShoes();
      setShoes(shoesData);
    };
    fetchShoes();
  }, []);

  const handleShoeSelect = (e) => {
    const shoeId = e.target.value;
    if (shoeId === 'new') {
      setSelectedShoe({ name: '', dateAdded: '', notes: '' });
      setIsEditing(true);
    } else {
      const shoe = shoes.find((s) => s.id === parseInt(shoeId));
      setSelectedShoe(shoe);
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (editedShoe) => {
    if (editedShoe.id) {
      const updatedShoe = await updateShoe(editedShoe);
      setShoes(shoes.map((s) => (s.id === updatedShoe.id ? updatedShoe : s)));
    } else {
      const newShoe = await createShoe(editedShoe);
      setShoes([...shoes, newShoe]);
    }
    setSelectedShoe(editedShoe);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (!selectedShoe.id) {
      setSelectedShoe(null);
    }
  };

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

      {selectedShoe && !isEditing && (
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
    </div>
  );
};

export default ShoesEditList;