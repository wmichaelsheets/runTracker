import React, { useState, useEffect } from 'react';
import RunStatsCard from './RunStatsCard';


export const RunStatsList = () => {
  const [runs, setRuns] = useState([]);
  const [shoes, setShoes] = useState([]);
  const [runTypes, setRunTypes] = useState([]);

  useEffect(() => {
    // Fetch initial data (replace with your actual API calls)
    const fetchData = async () => {
      try {
        const shoesResponse = await fetch('/api/shoes'); // Adjust path as needed
        const shoesData = await shoesResponse.json();
        setShoes(shoesData);

        const runTypesResponse = await fetch('/api/runtypes'); // Adjust path as needed
        const runTypesData = await runTypesResponse.json();
        setRunTypes(runTypesData);

        const runsResponse = await fetch('/api/runs'); // Adjust path as needed
        const runsData = await runsResponse.json();
        setRuns(runsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddRun = async (newRun) => {
    try {
      const response = await fetch("/api/runs", { // Adjust path as needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRun),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const addedRun = await response.json();
      setRuns([...runs, addedRun]); // Update the state with the new run
    } catch (error) {
      console.error("Error adding run:", error);
      // Handle error appropriately (e.g., display an error message)
    }
  };

  return (
    <div>
      <h2>Running Stats</h2>
      <RunStatsCard shoes={shoes} runTypes={runTypes} onSubmit={handleAddRun} />
      <h3>Your Runs:</h3>
      <ul>
        {runs.map((run) => (
          <li key={run.id}>
            Date: {new Date(run.occur).toLocaleDateString()} | Distance: {run.distance} km | Duration: {run.duration} min | Shoe: {shoes.find(shoe => shoe.id === run.shoe_id)?.name} | Type: {runTypes.find(type => type.id === run.type_id)?.name} | Notes: {run.notes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RunStatsList;