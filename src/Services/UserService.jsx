export const getUserByEmail = async (email) => {
    const res = await fetch(`http://localhost:8088/users?email=${email}`);
    return await res.json();
  };
  
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