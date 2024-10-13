import React, { useState, useEffect } from 'react';
import { createRun } from '../../Services/RunService';
import { useCurrentUser } from '../User/CurrentUser'; 

export const RunStatsCard = ({ shoes, runTypes, onRunAdded }) => {
  const currentUser = useCurrentUser();
  const [occur, setOccur] = useState('')
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedRunType || !selectedShoe || !currentUser) return
      
    const newRun = {
      occur,
      distance: parseFloat(distance),
      duration: parseFloat(duration),
      shoe_id: parseInt(selectedShoe.id, 10),
      type_id: parseInt(selectedRunType.id, 10),
      notes,
      user_id: currentUser.id
    }
  
    try {
      const createdRun = await createRun(newRun)
      console.log('New run created:', createdRun)
      onRunAdded(createdRun)
      
 
      setOccur('')
      setDistance('')
      setDuration('')
      setSelectedShoe(shoes[0] || { id: '', name: '' })
      setSelectedRunType(runTypes[0] || null)
      setNotes('')
    } catch (error) {
      console.error('Failed to create run:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input type="date" value={occur} onChange={(e) => setOccur(e.target.value)} required />
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
          value={selectedShoe.id}
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
  )
}