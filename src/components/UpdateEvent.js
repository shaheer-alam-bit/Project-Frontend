import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const UpdateEvent = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdate = async(e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:3000/event/changeEventDetails`, {
                id,
                title,
                date,
                description,
                price,
                location
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data)
            setMessage(response.data.message)
        } catch (error) {
            setMessage(error.response.data.message)
        }
    }


    return (
        <div>
            <h2>Update Event</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input type="date" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="number" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input type="text" className="form-control" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <button onClick={handleUpdate} className="btn btn-primary">Update Event</button>
                <p>{message}</p>
            </form>
        </div>
    );
}

export default UpdateEvent;