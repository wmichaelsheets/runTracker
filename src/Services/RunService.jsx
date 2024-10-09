export const getAllRuns = async () => {
    const res = await fetch(`http://localhost:8088/runs`);
    return await res.json();
  };

  export const getAllRunsByShoe = async (shoeId) => {
    const res = await fetch(`http://localhost:8088/runs?shoe_id=${shoeId}`);
    return await res.json();
  };
  
  export const createRun = async () => {
    const res = await fetch('http://localhost:8088/runs', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(),
      });
      return await res.json();
  };