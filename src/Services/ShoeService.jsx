export const getAllShoes = async () => {
    const res = await fetch(`http://localhost:8088/shoes`);
    return await res.json();
  };