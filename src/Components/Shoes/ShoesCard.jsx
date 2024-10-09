import { useEffect, useState } from 'react' 
import { Link } from "react-router-dom";
import { getAllRunsByShoe } from '../../Services/RunService';

export const ShoesCard = ({ shoe }) => {
    const [totalDistance, setTotalDistance] = useState(0)

    useEffect(() => {
        const calculateTotalDistance = async () => {
            try {
                const runs = await getAllRunsByShoe(shoe.id)
                const total = runs.reduce((sum, run) => sum + run.distance, 0)
                setTotalDistance(total)
            } catch (error) {
                console.error("Error calculating total distance:", error)
                setTotalDistance(0)
            }
        }
    
        calculateTotalDistance()
    }, [shoe.id])

    const handleDelete = () => {
        console.log("Delete shoe with id:", shoe.id)
    }

    return (
        <div className="shoe-card">
            <h2>{shoe.name}</h2>
            <p> Date Added: {new Date(shoe.dateAdded).toLocaleDateString()}</p>
            <p> Retired?: {shoe.isRetired ? 'Y' : 'N'}</p>
            <p> Total Distance: {totalDistance.toFixed(2)} miles</p>
            <button onClick={handleDelete}>Delete</button>
            <Link to={`/edit-shoe/${shoe.id}`}>
                <button>Edit</button>
                </Link>
        </div>
    )
}    

export default ShoesCard