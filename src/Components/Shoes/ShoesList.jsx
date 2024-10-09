import React, { useState, useEffect } from "react" 
import { getAllShoes } from "../../Services/ShoeService"
import ShoesCard from "./ShoesCard"

export const ShoesList = () => {
    const [shoes, setShoes] = useState([])

    useEffect(() => {
        const fetchShoes = async () => {
            const shoesData = await getAllShoes()
            setShoes(shoesData)
        }
        fetchShoes()
    }, [])

    const handleShoeDelete = (deletedShoeId) => {
        setShoes(shoes.filter(shoe => shoe.id !== deletedShoeId));
    }
    return (
        <div>
            <h2>Shoes</h2>
            <div className="shoes-list">
                {shoes.map(shoe => (
                    <ShoesCard key={shoe.id} shoe={shoe} onDelete={handleShoeDelete}/>
                ))}
            </div>
        </div>
    )
}

export default ShoesList
