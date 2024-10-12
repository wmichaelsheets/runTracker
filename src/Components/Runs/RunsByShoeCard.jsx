import React from 'react';

const RunsByShoeCard = ({ shoe, runs }) => {
  if (!shoe || !runs) {
    return <div>No data available</div>
  }

  const totalDistance = runs.reduce((sum, run) => sum + run.distance, 0)
  const totalDuration = runs.reduce((sum, run) => sum + run.duration, 0)

  const averagePace = totalDistance > 0 
    ? (totalDuration / totalDistance).toFixed(2) 
    : 'N/A'

  return (
    <div className="shoe-card">
      <h3>{shoe.name}</h3>
      <p>Total Runs: {runs.length}</p>
      <p>Total Distance: {totalDistance.toFixed(2)} miles</p>
      <p>Total Duration: {totalDuration.toFixed(2)} minutes</p>
      <p>Average Pace: {averagePace} min/mile</p>
      <h4>Runs:</h4>
      <ul>
        {runs.map((run) => (
          <li key={run.id}>
            Date: {new Date(run.occur).toLocaleDateString()} - 
            Distance: {run.distance.toFixed(2)} miles - 
            Duration: {run.duration.toFixed(2)} minutes
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RunsByShoeCard