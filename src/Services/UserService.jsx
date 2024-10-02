export const getUserByEmail = async (email) => {
    const res = await fetch(`http://localhost:8088/users?email=${email}`);
    return await res.json();
  };
  
  export const createUser = async (customer) => {
    const res = await fetch('http://localhost:8088/users', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(customer),
      });
      return await res.json();
  };