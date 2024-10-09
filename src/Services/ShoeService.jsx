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
