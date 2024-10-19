import React from 'react';
import './AllRunsCard.css';

export const AllRunsCard = ({ run, runTypes, onEdit }) => {
  const runType = runTypes.find(type => type.id === run.type_id)
  const pace = (run.duration / run.distance).toFixed(2)


  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000).toLocaleDateString()
  }

  return (
    <div className="all-runs-card">
      <div className="run-item">{formatDate(run.occur)}</div>
      <div className="run-item">{run.distance} miles</div>
      <div className="run-item">{run.duration} minutes</div>
      <div className="run-item">{pace} min/mile</div>
      <div className="run-item">{runType ? runType.name : 'Unknown'}</div>
      <div className="run-item">
        <button onClick={() => onEdit(run)} className="edit-button">Edit</button>
      </div>
    </div>
  )
}

export default AllRunsCard