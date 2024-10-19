import React, { useState, useEffect } from 'react';
import { getAllRunsByShoe } from '../../Services/RunService';
import { getShoeById, updateShoe } from '../../Services/ShoeService';

export const ShoesEditForm = ({ shoe: initialShoe, onClose, onSave }) => {
    const [shoe, setShoe] = useState({
        id: '',
        name: '',
        added: '',
        retired: false,
        notes: '',
        user_id: ''
    })
    const [totalDistance, setTotalDistance] = useState(0)

    useEffect(() => {
        const fetchShoeAndRuns = async () => {
            try {
                // Use the initialShoe data passed as a prop
                const shoeData = initialShoe;
                console.log("Received shoe data:", shoeData);
                // Ensure the date is in YYYY-MM-DD format
                const formattedDate = new Date(shoeData.added).toISOString().split('T')[0]
                setShoe({...shoeData, added: formattedDate})

                const runs = await getAllRunsByShoe(shoeData.id)
                const total = runs.reduce((sum, run) => sum + parseFloat(run.distance), 0)
                setTotalDistance(total)
            } catch (error) {
                console.error("Error fetching shoe and runs:", error)
            }
        }

        fetchShoeAndRuns()
    }, [initialShoe])

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
            // Ensure the date is in the correct format before sending to the server
            const submittedShoe = {...shoe, added: new Date(shoe.added).toISOString().split('T')[0]}
            const updatedShoe = await updateShoe(submittedShoe)
            onSave(updatedShoe)
        } catch (error) {
            console.error("Error updating shoe:", error)
        }
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
                    <p>Total Distance: {totalDistance.toFixed(2)} miles</p>
                </div>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    )
}