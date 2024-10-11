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
  
  export const createRun = async (runData) => {
    try {
      const response = await fetch('http://localhost:8088/runs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(runData),
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      const createdRun = await response.json()
      return createdRun;
    } catch (error) {
      console.error('Error creating run:', error)
      throw error
    }
  }