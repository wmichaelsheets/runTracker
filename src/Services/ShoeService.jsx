export const getAllShoes = async () => {
    const res = await fetch(`http://localhost:8088/shoes`);
    return await res.json();
  };

  export const deleteShoe = async (shoeId) => {
    const res = await fetch(`http://localhost:8088/shoes/${shoeId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) {
        throw new Error('Failed to delete shoe');
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
    return await res.json();
};

export const updateShoe = async (shoeId, shoeData) => {
    const res = await fetch(`http://localhost:8088/shoes/${shoeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(shoeData),
    });
    if (!res.ok) {
        throw new Error('Failed to update shoe');
    }
    return await res.json();
};