export const getAllRuns = async () => {
    const res = await fetch(`http://localhost:8088/runs`)
    return await res.json()
  };

  export const getAllRunsByShoe = async (shoeId) => {
    const res = await fetch(`http://localhost:8088/runs?shoe_id=${shoeId}&_expand=type`)
    if (!res.ok) {
      throw new Error('Failed to fetch runs for shoe')
    }
    const data = await res.json()
    return data
  }
  
  export const createRun = async (newRun) => {
    const runWithoutId = { ...newRun };
    delete runWithoutId.id
  
    const res = await fetch('http://localhost:8088/runs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(runWithoutId),
    })
  
    return await res.json();
  }

  export const updateRun = async (updatedRun) => {
  const response = await fetch(`http://localhost:8088/runs/${updatedRun.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedRun),
  })

  if (!response.ok) {
    throw new Error('Failed to update run')
  }

  return await response.json()
}
