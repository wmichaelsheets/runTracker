import React, { useState, useEffect } from 'react';
import RunsByShoeCard from './RunsByShoeCard';
import { getAllRunsByShoe } from '../../Services/RunService';
import { getAllShoes } from '../../Services/ShoeService';
import { getAllRunTypes } from '../../Services/RunTypeService';
import { useCurrentUser } from '../User/CurrentUser';

export const RunsByShoeList = () => {
  const [shoes, setShoes] = useState([])
  const [selectedShoe, setSelectedShoe] = useState("")
  const [runs, setRuns] = useState([])
  const [runTypes, setRunTypes] = useState([])
  const currentUser = useCurrentUser()

  useEffect(() => {
    const fetchShoes = async () => {
      if (currentUser && currentUser.id) {
        try {
          const allShoes = await getAllShoes();
          const userShoes = allShoes.filter(shoe => shoe.user_id === currentUser.id);
          setShoes(userShoes)
        } catch (error) {
          console.error('Error fetching shoes:', error)
        }
      }
    }
    fetchShoes()

    const fetchRunTypes = async () => {
      try {
        const types = await getAllRunTypes()
        const typesMap = types.reduce((acc, type) => {
          acc[type.id] = type.name
          return acc
        }, {});
        setRunTypes(typesMap)
      } catch (error) {
        console.error('Error fetching run types:', error)
      }
    }
    fetchRunTypes()
  }, [currentUser])

  const handleShoeChange = async (event) => {
    const selectedShoeId = event.target.value
    setSelectedShoe(selectedShoeId)

    if (selectedShoeId) {
      try {
        const runsData = await getAllRunsByShoe(selectedShoeId);
        console.log("Fetched runs:", runsData);
        setRuns(runsData);
      } catch (error) {
        console.error('Error fetching runs:', error)
      }
    } else {
      setRuns([])
    }
  }

  if (!currentUser) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <select value={selectedShoe} onChange={handleShoeChange}>
        <option value="">Select a shoe</option>
        {shoes.map((shoe) => (
          <option key={shoe.id} value={shoe.id}>{shoe.name}</option>
        ))}
      </select>
      {selectedShoe && (
        <RunsByShoeCard 
          shoe={shoes.find((shoe) => shoe.id === parseInt(selectedShoe))} 
          runs={runs} 
          runTypes={runTypes}
        />
      )}
    </div>
  )
}