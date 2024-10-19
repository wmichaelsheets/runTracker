export const getAllRunTypes = async () => {
    const res = await fetch(`http://localhost:8088/runType`)
    return await res.json()
  }