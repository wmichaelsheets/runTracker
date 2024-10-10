import { useEffect, useState } from 'react' 
import { Link, useNavigate } from "react-router-dom";
import { getAllRunsByShoe } from '../../Services/RunService';
import { getAllShoes, deleteShoe } from '../../Services/ShoeService';

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
}

export const ShoesCard = ({ shoe, onDelete }) => {
    const [totalDistance, setTotalDistance] = useState(0)
    const [updatedShoe, setUpdatedShoe] = useState(shoe)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchShoeData = async () => {
            try {
                const shoes = await getAllShoes()
                const currentShoe = shoes.find(s => s.id === shoe.id)
                if (currentShoe) {
                    setUpdatedShoe(currentShoe)
                }
            } catch (error) {
                console.error("Error fetching shoe data:", error)
            }
        }

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
    
        fetchShoeData()
        calculateTotalDistance()
    }, [shoe.id])

    const handleDelete = async () => {
        
        const isConfirmed = window.confirm(`Are you sure you want to delete ${updatedShoe.name}?`);
        
        if (isConfirmed) {
            try {
                await deleteShoe(shoe.id);
                console.log("Shoe deleted successfully");
                if (onDelete) {
                    onDelete(shoe.id);
                }
                
                navigate('/shoes');
            } catch (error) {
                console.error("Error deleting shoe:", error);
            }
        }
    }

    return (
        <div className="shoe-card">
            <h2>{updatedShoe.name}</h2>
            <p>Date Added: {formatDate(updatedShoe.added)}</p>
            <p>Retired: {updatedShoe.retired ? 'Y' : 'N'}</p>
            <p>Total Distance: {totalDistance.toFixed(2)} miles</p>
            <button onClick={handleDelete}>Delete</button>
            <Link to={`/shoesEdit/${updatedShoe.id}`}>
                <button>Edit</button>
            </Link>
        </div>
    )
}    

export default ShoesCard