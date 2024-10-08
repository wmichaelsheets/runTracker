import React, { useState, useEffect } from 'react';
import { RunStatsCard } from './RunsStatsCard';
import { getAllShoes } from '../../Services/ShoeService';
import { getAllRunTypes } from '../../Services/RunTypeService';
import { getAllRuns } from '../../Services/RunService';
import { createRun } from '../../Services/RunService';


export const RunStatsList = () => {
  const [runs, setRuns] = useState([])
  const [shoes, setShoes] = useState([])
  const [runTypes, setRunTypes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shoesData = await getAllShoes()
        setShoes(shoesData)

        const runTypesData = await getAllRunTypes()
        setRunTypes(runTypesData)

        const runsData = await getAllRuns()
        setRuns(runsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [])

  const handleAddRun = async (newRun) => {
    try {
      const response = await createRun({
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRun),
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      const addedRun = await response.json()
      
      if (Array.isArray(addedRun)) {
        setRuns([...runs, ...addedRun])
      } else {
        setRuns([...runs, addedRun])
      }
  
      console.log('Run successfully added:', addedRun)
    } catch (error) {
      console.error("Error adding run:", error.message || error)
      
    }
  }

  return (
    <div>
      <h2>Running Stats</h2>
      <RunStatsCard shoes={shoes} runTypes={runTypes} onSubmit={handleAddRun} />
      {/* <h3>Your Runs:</h3>
      <ul>
        {runs.map((run) => (
          <li key={run.id}>
            Date: {new Date(run.occur).toLocaleDateString()} | Distance: {run.distance} mi | Duration: {run.duration} min | Shoe: {shoes.find(shoe => shoe.id === run.shoe_id)?.name} | Type: {runTypes.find(type => type.id === run.type_id)?.name} | Notes: {run.notes}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default RunStatsList