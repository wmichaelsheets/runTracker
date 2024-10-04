export const getAllRunTypes = async (email) => {
    const res = await fetch(`http://localhost:8088/runType`);
    return await res.json();
  };