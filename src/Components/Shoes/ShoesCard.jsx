import React, { useState, useEffect } from 'react';
import { formatDate } from '../utils/dateUtils';

export const ShoesCard = ({ shoe, onDelete, onEdit }) => {
  const [runs, setRuns] = useState([])
  const [expandedShoeId, setExpandedShoeId] = useState(null)

  useEffect(() => {
    const fetchRuns = async () => {
      try {
        const response = await fetch(`http://localhost:8088/runs?shoe_id=${shoe.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch runs')
        }
        const data = await response.json()
        setRuns(data)
      } catch (error) {
        console.error('Error fetching runs:', error)
      }
    }

    fetchRuns()
  }, [shoe.id])

  const handleDelete = () => {
    
      onDelete(shoe.id)
    
  }

  const handleEdit = () => {
    onEdit(shoe.id);
  }

  const toggleExpand = () => {
    setExpandedShoeId(expandedShoeId === shoe.id ? null : shoe.id)
  }

  const totalDistance = runs.reduce((sum, run) => sum + (Number(run.distance) || 0), 0)
  const totalDuration = runs.reduce((sum, run) => sum + (Number(run.duration) || 0), 0)
  const averagePace = totalDistance > 0 ? (totalDuration / totalDistance) : 0

  return (
    <div className="shoe-card">
      <h3>{shoe.name}</h3>
      <p>Date Added: {formatDate(shoe.added)}</p>
      <p>Total Runs: {runs.length}</p>
      <p>Total Distance: {totalDistance.toFixed(2)} miles</p>
      <p>Total Duration: {totalDuration.toFixed(2)} minutes</p>
      <p>Average Pace: {averagePace.toFixed(2)} min/mile</p>
      <p>Retired: {shoe.retired ? 'Yes' : 'No'}</p>
      <p>Notes: {shoe.notes ? shoe.notes : 'No notes available'}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={toggleExpand}>
        {expandedShoeId === shoe.id ? 'Hide Runs' : 'Show Runs'}
      </button>
      {expandedShoeId === shoe.id && (
        <div>
          <h4>Runs:</h4>
          <ul>
            {runs.map(run => (
              <li key={run.id}>
                Date: {formatDate(run.occur)}, 
                Distance: {Number(run.distance).toFixed(2)} miles, 
                Duration: {Number(run.duration).toFixed(2)} minutes
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}