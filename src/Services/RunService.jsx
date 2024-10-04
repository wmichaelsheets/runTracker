export const getAllRuns = async (email) => {
    const res = await fetch(`http://localhost:8088/runs`);
    return await res.json();
  };
  
  export const createRun = async (customer) => {
    const res = await fetch('http://localhost:8088/runs', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(customer),
      });
      return await res.json();
  };