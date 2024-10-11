export const getUserByEmail = async (email) => {
    const res = await fetch(`http://localhost:8088/users?email=${email}`);
    return await res.json();
  };

  export const getUserById = async (id) => {
    try {
      const response = await fetch(`http://localhost:8088/users/${id}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const userData = await response.json() 
      return userData
    } catch (error) {
      console.error("Error in getUserById:", error)
      throw error
    }
  }
  
  export const createUser = async () => {
    const res = await fetch('http://localhost:8088/users', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(),
      });
      return await res.json();
  };