import React, { useState, useEffect } from "react" 
import { getAllShoes, updateShoe } from "../../Services/ShoeService"
import ShoesCard from "./ShoesCard"
import { ShoesEditCard } from "./ShoesEditCard"
import { useNavigate } from "react-router-dom"

export const ShoesList = () => {
    const navigate = useNavigate()
    const [shoes, setShoes] = useState([])
    const [editingShoe, setEditingShoe] = useState(null)

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

    const handleEditClick = (shoe) => {
        navigate(`/shoes/edit/${shoe.id}`)
      }

    const handleSave = async (updatedShoe) => {
        try {
            const savedShoe = await updateShoe(updatedShoe);
            setShoes(shoes.map(shoe => shoe.id === savedShoe.id ? savedShoe : shoe));
            setEditingShoe(null);
        } catch (error) {
            console.error("Failed to update shoe:", error);
            
        }
    }

    const handleCancel = () => {
        setEditingShoe(null);
    }

    return (
        <div>
            <h2>Shoes</h2>
            <div className="shoes-list">
                {shoes.map(shoe => (
                    <ShoesCard 
                        key={shoe.id} 
                        shoe={shoe} 
                        onDelete={handleShoeDelete}
                        onEdit={() => handleEditClick(shoe)}
                    />
                ))}
            </div>
            {editingShoe && (
                <ShoesEditCard
                    shoe={editingShoe}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}
        </div>
    )
}


