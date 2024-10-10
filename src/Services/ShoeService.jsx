export const getAllShoes = async () => {
    const res = await fetch(`http://localhost:8088/shoes`)
    return await res.json()
  };

  export const getShoeById = async (shoeId) => {
    try {
        const res = await fetch(`http://localhost:8088/shoes/${shoeId}`)
        if (!res.ok) {
            throw new Error('Failed to fetch shoe')
        }
        return await res.json()
    } catch (error) {
        console.error("Error fetching shoe:", error)
        throw error
    }
 
  }

  export const deleteShoe = async (shoeId) => {
    const res = await fetch(`http://localhost:8088/shoes/${shoeId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) {
        throw new Error('Failed to delete shoe')
    }
    return true; 
};

export const createShoe = async (shoeData) => {
    const res = await fetch(`http://localhost:8088/shoes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(shoeData),
    });
    if (!res.ok) {
        throw new Error('Failed to create shoe');
    }
    return await res.json()
};

export const updateShoe = async (shoeData) => {
    const res = await fetch(`http://localhost:8088/shoes/${shoeData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(shoeData),
    })
    if (!res.ok) {
        throw new Error('Failed to update shoe');
    }
    return await res.json()
};