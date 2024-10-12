import RunsByShoeCard from './RunsByShoeCard';
import React, { useState, useEffect } from 'react';
import { getAllShoes } from '../../Services/ShoeService';
import { useCurrentUser } from '../User/CurrentUser';

export const RunsByShoeList = () => {
  const [shoes, setShoes] = useState([])
  const [selectedShoe, setSelectedShoe] = useState('')
  const [runs, setRuns] = useState([])
  const currentUser = useCurrentUser()

  useEffect(() => {
    const fetchShoes = async () => {
      if (currentUser) {
        try {
          const shoesData = await getAllShoes(currentUser.id)
          setShoes(shoesData)
        } catch (error) {
          console.error('Error fetching shoes:', error)
        }
      }
    }
    fetchShoes()
  }, [currentUser])

  const handleShoeChange = async (event) => {
    const selectedShoeId = event.target.value
    setSelectedShoe(selectedShoeId)

    if (selectedShoeId) {
      try {
        const response = await fetch(`http://localhost:8088/runs?shoe_id=${selectedShoeId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch runs')
        }
        const data = await response.json()
        setRuns(data)
      } catch (error) {
        console.error('Error fetching runs:', error)
        setRuns([])
      }
    } else {
      setRuns([])
    }
  }

  const selectedShoeObject = shoes.find((shoe) => shoe.id === parseInt(selectedShoe))

  return (
    <div>
      <select value={selectedShoe} onChange={handleShoeChange}>
        <option value="">Select a shoe</option>
        {shoes.map((shoe) => (
          <option key={shoe.id} value={shoe.id}>{shoe.name}</option>
        ))}
      </select>
      {selectedShoe && selectedShoeObject && (
        <RunsByShoeCard shoe={selectedShoeObject} runs={runs} />
      )}
    </div>
  )
}