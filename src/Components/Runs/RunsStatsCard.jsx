import React, { useState, useEffect } from 'react';
import { createRun } from '../../Services/RunService';
import { useCurrentUser } from '../User/CurrentUser';
import './RunsStatsCard.css';

export const RunStatsCard = ({ shoes, runTypes, onRunAdded }) => {
  const currentUser = useCurrentUser()
  const [occur, setOccur] = useState('')
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [averagePace, setAveragePace] = useState('')
  const [selectedShoe, setSelectedShoe] = useState(shoes[0] || { id: '', name: '' })
  const [selectedRunType, setSelectedRunType] = useState(runTypes[0] || null)
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    
    setIsSubmitting(true)

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
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="run-stats-form">
      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input 
          id="date"
          type="date" 
          value={occur} 
          onChange={(e) => setOccur(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="distance">Distance (mi):</label>
        <input 
          id="distance"
          type="number" 
          step="0.1" 
          value={distance} 
          onChange={(e) => setDistance(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="duration">Duration (min):</label>
        <input 
          id="duration"
          type="number" 
          step="0.1" 
          value={duration} 
          onChange={(e) => setDuration(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="averagePace">Average Pace (min/mi):</label>
        <input 
          id="averagePace"
          type="text" 
          value={averagePace} 
          readOnly 
        />
      </div>
      <div className="form-group">
        <label htmlFor="shoe">Shoe:</label>
        <select 
          id="shoe"
          value={selectedShoe.id}
          onChange={(e) => {
            const selectedShoeId = parseInt(e.target.value, 10);
            setSelectedShoe(shoes.find(shoe => shoe.id === selectedShoeId) || { id: '', name: '' })
          }}
        >
          <option value="">Select a Shoe</option>
          {shoes.map((shoe) => (
            <option key={shoe.id} value={shoe.id}>{shoe.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group run-type-container">
        <label className="run-type-label">Run Type:</label>
        <div className="run-type-options">
          {runTypes.map((type) => (
            <label key={type.id} className="run-type-option">
              <input
                type="radio"
                value={type.id}
                checked={selectedRunType && selectedRunType.id === type.id}
                onChange={() => setSelectedRunType(type)}
                required
              />
              {type.name}
            </label>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="notes">Notes:</label>
        <textarea 
          id="notes"
          value={notes} 
          onChange={(e) => setNotes(e.target.value)} 
        />
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding Run...' : 'Add Run'}
      </button>
    </form>
  )
}