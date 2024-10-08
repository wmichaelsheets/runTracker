import React
import { Link } from "react-router-dom";

const ShoesCard = ({ shoe }) => {
    const calculateTotalDistance = () => {
        return 0
    }

    const handleDelete = () => {
        console.log("Delete shoe with id:", shoe.id)
    }

    return (
        <div className="shoe-card">
            <h2>{shoe.name}</h2>
            <p> Date Added: {new Date(shoe.dateAdded)toLocaleDateString()}</p>
            <p> Status: {shoe.isRetired ? 'Retired' : 'Active'}</p>
            <p> Total Distance: {calculateTotalDistance()} miles</p>
            <button onClick={handleDelete}>Delete</button>
            <Link to={`/edit-shoe/${shoe.id}`}>
                <button>Edit</button>
                </Link>
        </div>
    )
}    

export default ShoesCard