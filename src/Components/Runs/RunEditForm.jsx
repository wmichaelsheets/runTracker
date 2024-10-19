import React, { useState, useEffect } from 'react';
import { updateRun } from '../../Services/RunService';

export const RunEditForm = ({ run, runTypes, onUpdate, onCancel }) => {
  const [editedRun, setEditedRun] = useState({...run});

  useEffect(() => {

    if (run.occur) {
      setEditedRun(prev => ({
        ...prev,
        occur: formatDateToYYYYMMDD(new Date(run.occur))
      }))
    }
  }, [run])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRun(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const submitRun = {...editedRun};


      if (submitRun.occur) {
        submitRun.occur = formatDateToYYYYMMDD(new Date(submitRun.occur))
      }

      submitRun.distance = parseFloat(submitRun.distance)
      submitRun.duration = parseFloat(submitRun.duration)
      submitRun.type_id = parseInt(submitRun.type_id, 10)

      const updatedRun = await updateRun(submitRun)
      onUpdate(updatedRun)
    } catch (error) {
      console.error("Error updating run:", error)
    }
  }

  
  const formatDateToYYYYMMDD = (date) => {
    return date.toISOString().split('T')[0];
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Run</h2>
      <div>
        <label htmlFor="occur">Date:</label>
        <input
          type="date"
          id="occur"
          name="occur"
          value={editedRun.occur}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="distance">Distance (miles):</label>
        <input
          type="number"
          id="distance"
          name="distance"
          value={editedRun.distance}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="duration">Duration (minutes):</label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={editedRun.duration}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="type_id">Run Type:</label>
        <select
          id="type_id"
          name="type_id"
          value={editedRun.type_id}
          onChange={handleChange}
          required
        >
          {runTypes.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          name="notes"
          value={editedRun.notes}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Update Run</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  )
}