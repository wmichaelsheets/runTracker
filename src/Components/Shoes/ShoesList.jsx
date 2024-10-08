import React, { useState, useEffect } from "react" 
import { getAllShoes } from "../../Services/ShoeService"
import ShoesCard from "./ShoesCard"

const ShoesList = () => {
    const [shoes, setShoes] = useState([])

    useEffect(() => {
        const fetchShoes = async () => {
            const shoesData = await getAllShoes()
            setShoes(shoesData)
        }
        fetchShoes()
    }, [])

    return (
        <div>
            <h2>Shoes</h2>
            <div className="shoes-list">
                {shoes.map(shoe => (
                    <ShoesCard key={shoe.id} shoe={shoe} />
                ))}
            </div>
        </div>
    )
}

export default ShoesList
