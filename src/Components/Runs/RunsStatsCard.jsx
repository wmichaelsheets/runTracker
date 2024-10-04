import React, { useState } from 'react';

export const RunStatsCard = ({ shoes, runTypes, onSubmit }) => {
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedShoe, setSelectedShoe] = useState(shoes[0]); 
  const [selectedRunType, setSelectedRunType] = useState(runTypes[0]); 
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRun = {
      date,
      distance: parseFloat(distance),
      duration: parseFloat(duration),
      shoe_id: selectedShoe.id,
      type_id: selectedRunType.id,
      notes,
    };
    onSubmit(newRun);
    // Reset form after submission
    setDate('');
    setDistance('');
    setDuration('');
    setSelectedShoe(shoes[0]);
    setSelectedRunType(runTypes[0]);
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <br />
      <label>
        Distance (mi):
        <input type="number" step="0.1" value={distance} onChange={(e) => setDistance(e.target.value)} required />
      </label>
      <br />
      <label>
        Duration (min):
        <input type="number" step="0.1" value={duration} onChange={(e) => setDuration(e.target.value)} required />
      </label>
      <br />
      <label>
        Shoe:
        <select value={selectedShoe} onChange={(e) => setSelectedShoe(shoes.find(shoe => shoe.id === parseInt(e.target.value, 10)))}>
          {shoes.map((shoe) => (
            <option key={shoe.id} value={shoe.id}>{shoe.name}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Run Type:
        {runTypes.map((type) => (
          <label key={type.id}>
            <input
              type="radio"
              value={type.id}
              checked={selectedRunType.id === type.id}
              onChange={(e) => setSelectedRunType(type)}
              required
            />
            {type.name}
          </label>
        ))}
      </label>
      <br />
      <label>
        Notes:
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>
      <br />
      <button type="submit">Add Run</button>
    </form>
  );
};

export default RunStatsCard;