import React from 'react';

export const RunsByShoeCard = ({ shoe, runs, runTypes }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return dateString
    }
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options)
  };

  return (
    <div>
      <h2>Runs for {shoe.name}</h2>
      {runs.length > 0 ? (
        <ul>
          {runs.map((run) => (
            <li key={run.id}>
              <span>Date: {formatDate(run.occur)}</span>
              <span>Distance: {run.distance} miles</span>
              <span>Duration: {run.duration} minutes</span>
              <span>Run Type: {runTypes[run.type_id] || 'Unknown'}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No runs found for this shoe.</p>
      )}
    </div>
  )
}

export default RunsByShoeCard