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
      const response = await fetch('http://localhost:8088/runs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRun),
      })
  
      if (!response.ok) {
        throw new Error('Failed to add new run')
      }
  
      const addedRun = await response.json()
      console.log('Run added successfully:', addedRun)
  
      // Update your state or perform any other necessary actions
    } catch (error) {
      console.error('Error adding run:', error)
    }
  }

  return (
    <div>
      <h2>Running Stats</h2>
      <RunStatsCard shoes={shoes} runTypes={runTypes} onSubmit={handleAddRun} />
      </div>
  );
};

export default RunStatsList