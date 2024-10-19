import React, { useState, useEffect } from "react" 
import { getUserShoes, deleteShoe } from "../../Services/ShoeService"
import { ShoesCard } from "./ShoesCard"
import { useCurrentUser } from '../User/CurrentUser' 
import { ShoesEditForm } from './ShoesEditForm'

export const ShoesList = () => {
    const [shoes, setShoes] = useState([])
    const currentUser = useCurrentUser()
    const [editingShoe, setEditingShoe] = useState(null)

    useEffect(() => {
        const fetchUserShoes = async () => {
            if (currentUser && currentUser.id) {
                try {
                    const userShoesData = await getUserShoes(currentUser.id)
                    setShoes(userShoesData)
                } catch (error) {
                    console.error("Failed to fetch user's shoes:", error)
                }
            }
        }
        fetchUserShoes()
    }, [currentUser])

    const handleShoeDelete = async (shoeId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this shoe?");
        if (isConfirmed) {
            try {
                await deleteShoe(shoeId);
                setShoes(shoes.filter(shoe => shoe.id !== shoeId));
            } catch (error) {
                console.error("Failed to delete shoe:", error);
            }
        }
    }

    const handleEditClick = (shoe) => {
        setEditingShoe(shoe)
    }

    const handleEditClose = () => {
        setEditingShoe(null);

        if (currentUser && currentUser.id) {
            getUserShoes(currentUser.id).then(setShoes);
        }
    }

    const handleEditSave = (updatedShoe) => {
        setShoes(shoes.map(shoe => shoe.id === updatedShoe.id ? updatedShoe : shoe));
        setEditingShoe(null);
    }

    if (!currentUser) {
        return <div>Please log in to view your shoes.</div>
    }

    return (
        <div>
            <h2>My Shoes</h2>
            <div className="shoes-list">
                {shoes.map(shoe => (
                    <ShoesCard 
                        key={shoe.id} 
                        shoe={shoe} 
                        onDelete={() => handleShoeDelete(shoe.id)}
                        onEdit={() => handleEditClick(shoe)}
                    />
                ))}
            </div>
            {editingShoe && (
                <div className="modal">
                    <div className="modal-content">
                        <ShoesEditForm 
                            shoe={editingShoe} 
                            onClose={handleEditClose} 
                            onSave={handleEditSave}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}