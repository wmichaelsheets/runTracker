import { getAllRuns } from '../../Services/RunService';
import { useCurrentUser } from '../User/CurrentUser';
import { getAllRunTypes } from '../../Services/RunTypeService';
import React, { useState, useEffect } from 'react';
import { RunEditForm } from './RunEditForm';
import { AllRunsCard } from './AllRunsCard';
import './AllRunsList.css';

export const AllRunsList = () => {
  const [runs, setRuns] = useState([])
  const [runTypes, setRunTypes] = useState([])
  const currentUser = useCurrentUser()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRun, setSelectedRun] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser && currentUser.id) {
        const allRuns = await getAllRuns()
        const userRuns = allRuns.filter(run => run.user_id === currentUser.id)
        setRuns(userRuns)

        const types = await getAllRunTypes()
        setRunTypes(types)
      }
    }
    fetchData()
  }, [currentUser])

  const handleEditRun = (run) => {
    setSelectedRun(run)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedRun(null)
  }

  const handleUpdateRun = (updatedRun) => {
    setRuns(runs.map(run => run.id === updatedRun.id ? updatedRun : run))
    handleCloseModal()
  }

  if (!currentUser) {
    return <div>Please log in to view your runs.</div>;
  }

  return (
    <div className="all-runs-list">
      <h2>All Runs</h2>
      <div className="runs-header">
        <div className="run-header-item">Date</div>
        <div className="run-header-item">Distance</div>
        <div className="run-header-item">Duration</div>
        <div className="run-header-item">Pace</div>
        <div className="run-header-item">Type</div>
        <div className="run-header-item">Edit</div>
      </div>
      {runs.length > 0 ? (
        runs.map(run => (
          <AllRunsCard 
            key={run.id} 
            run={run} 
            runTypes={runTypes} 
            onEdit={() => handleEditRun(run)}
          />
        ))
      ) : (
        <p>No runs recorded yet.</p>
      )}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <RunEditForm 
              run={selectedRun} 
              runTypes={runTypes}
              onUpdate={handleUpdateRun}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  )
}