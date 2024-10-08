import React, { useState, useEffect } from 'react';
import { getAllShoes } from '../../Services/ShoeService';
import { getAllRunTypes } from '../../Services/RunTypeService';

export const RunStatsCard = ({ shoes, runTypes, onSubmit }) => {
  const [date, setDate] = useState('')
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [averagePace, setAveragePace] = useState('')
  const [selectedShoe, setSelectedShoe] = useState(shoes[0] || { id: '', name: '' })
  const [selectedRunType, setSelectedRunType] = useState(runTypes[0] || null) 
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (runTypes.length > 0 && !selectedRunType) {
      setSelectedRunType(runTypes[0])
    }
  }, [runTypes, selectedRunType])

  useEffect(() => {
    if (shoes.length > 0 && (!selectedShoe || !selectedShoe.id)) {
      setSelectedShoe(shoes[0])
    }
    }, [shoes, selectedShoe])

    useEffect(() => {
    calculateAveragePace()
  }, [distance, duration])

  const calculateAveragePace = () => {
    if (distance && duration) {
      const distanceInMiles = parseFloat(distance)
      const durationInMinutes = parseFloat(duration)
      if (distanceInMiles > 0 && durationInMinutes > 0) {
        const pace = durationInMinutes / distanceInMiles
        setAveragePace(pace.toFixed(2))
      } else {
        setAveragePace('')
      }
    } else {
      setAveragePace('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedRunType) return
      
    const newRun = {
      date,
      distance: parseFloat(distance),
      duration: parseFloat(duration),
      shoe_id: selectedShoe.id || '',
      type_id: selectedRunType.id,
      notes,
    };
    onSubmit(newRun)
    setDate('')
    setDistance('')
    setDuration('')
    setSelectedShoe(shoes[0] || { id: '', name: '' })
    setSelectedRunType(runTypes[0] || null)
    setNotes('')
  }

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
        Average Pace (min/mi):
        <input type="text" value={averagePace} readOnly />
      </label>
      <br />
      <label>
        Shoe:
        <select 
          value={selectedShoe ? selectedShoe.id : ''}
          onChange={(e) => {
            const selectedShoeId = parseInt(e.target.value, 10)
            setSelectedShoe(shoes.find(shoe => shoe.id === selectedShoeId) || { id: '', name: '' })
          }}
        >
          <option value="">Select a Shoe</option>
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
              checked={selectedRunType && selectedRunType.id === type.id}
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

