import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getShoeById, updateShoe } from '../../Services/ShoeService';

export const ShoesEditForm = () => {
    const [shoe, setShoe] = useState({
      name: '',
      dateAdded: '',
      retired: false,
      notes: ''
    })
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchShoe = async () => {
            try {
                const shoeData = await getShoeById(id)
                setShoe(shoeData)
            } catch (error) {
                console.error("Error fetching shoe:", error)
                // Handle error (e.g., show error message or redirect)
            }
        }

        if (id) {
            fetchShoe()
        }
    }, [id])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setShoe(prevShoe => ({
            ...prevShoe,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateShoe(shoe)
            navigate('/shoes')
        } catch (error) {
            console.error("Error updating shoe:", error);
            // Handle error (e.g., show error message)
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
                    <label htmlFor="dateAdded">Date Added:</label>
                    <input
                        type="date"
                        id="dateAdded"
                        name="dateAdded"
                        value={shoe.dateAdded}
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
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => navigate('/shoes')}>Cancel</button>
            </form>
        </div>
    )
}

export default ShoesEditForm;