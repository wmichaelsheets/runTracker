import React, { useState, useEffect } from 'react';
import { RunStatsCard } from './RunsStatsCard';
import { getUserShoes } from '../../Services/ShoeService';
import { getAllRunTypes } from '../../Services/RunTypeService';
import { getAllRuns, createRun } from '../../Services/RunService';
import { useCurrentUser } from '../User/CurrentUser'; 

export const RunStatsList = () => {
  const [runs, setRuns] = useState([])
  const [shoes, setShoes] = useState([])
  const [runTypes, setRunTypes] = useState([])
  const currentUser = useCurrentUser()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser && currentUser.id) {
          const shoesData = await getUserShoes(currentUser.id)
          setShoes(shoesData)

          const runTypesData = await getAllRunTypes()
          setRunTypes(runTypesData)

          const runsData = await getAllRuns()
          setRuns(runsData)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [currentUser])

  const handleAddRun = (addedRun) => {
    
    setRuns(prevRuns => [...prevRuns, addedRun])
  }

  if (!currentUser) {
    return <div>Please log in to view your running stats.</div>
  }

  return (
    <div>
      <h2>Enter A Run</h2>
      {shoes.length > 0 && runTypes.length > 0 ? (
      <RunStatsCard shoes={shoes} runTypes={runTypes} onRunAdded={handleAddRun} />
      ) : (
      <div>Please enter a shoe before creating a run...</div>
      )}
    </div>
  )
}

export default RunStatsList