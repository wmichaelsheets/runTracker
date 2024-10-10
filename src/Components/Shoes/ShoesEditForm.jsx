import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getShoeById, updateShoe } from '../../Services/ShoeService';
import { getAllRunsByShoe } from '../../Services/RunService';

export const ShoesEditForm = () => {
    const [shoe, setShoe] = useState({
        id: '',
        name: '',
        added: '',
        retired: false,
        notes: '',
        user_id: ''
    })
    const [totalDistance, setTotalDistance] = useState(0)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchShoeAndRuns = async () => {
            try {
                const shoeData = await getShoeById(id)
                setShoe(shoeData)

                const runs = await getAllRunsByShoe(id)
                const total = runs.reduce((sum, run) => sum + parseFloat(run.distance), 0)
                setTotalDistance(total)
            } catch (error) {
                console.error("Error fetching shoe and runs:", error)
            }
        }

        if (id) {
            fetchShoeAndRuns()
        }
    }, [id])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setShoe(prevShoe => ({
            ...prevShoe,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await updateShoe(shoe)
            navigate('/shoes')
        } catch (error) {
            console.error("Error updating shoe:", error)
        }
    }

    if (!shoe.id) {
        return <div>Loading...</div>
    }

    return (
        <div className="shoes-edit-form">
            <h2>Edit Shoe</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={shoe.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="added">Date Added:</label>
                    <input
                        type="date"
                        id="added"
                        name="added"
                        value={shoe.added}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="retired">Retired:</label>
                    <input
                        type="checkbox"
                        id="retired"
                        name="retired"
                        checked={shoe.retired}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="notes">Notes:</label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={shoe.notes}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Total Distance:</label>
                    <span>{totalDistance.toFixed(2)} miles</span>
                </div>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => navigate('/shoes')}>Cancel</button>
            </form>
        </div>
    )
}

export default ShoesEditForm;