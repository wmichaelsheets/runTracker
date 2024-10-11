import React, { useState, useEffect } from "react" 
import { getUserShoes } from "../../Services/ShoeService"
import ShoesCard from "./ShoesCard"
import { useNavigate } from "react-router-dom"
import { useCurrentUser } from '../User/CurrentUser' // Ensure this path is correct

export const ShoesList = () => {
    const navigate = useNavigate()
    const [shoes, setShoes] = useState([])
    const currentUser = useCurrentUser()

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

    const handleShoeDelete = (deletedShoeId) => {
        setShoes(shoes.filter(shoe => shoe.id !== deletedShoeId));
    }

    const handleEditClick = (shoe) => {
        navigate(`/shoes/edit/${shoe.id}`)
    }

    if (!currentUser) {
        return <div>Please log in to view your shoes.</div>
    }

    return (
        <div>
            <h2>My Shoes</h2>
            {shoes.length === 0 ? (
                <p>You haven't added any shoes yet.</p>
            ) : (
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
            )}
        </div>
    )
}