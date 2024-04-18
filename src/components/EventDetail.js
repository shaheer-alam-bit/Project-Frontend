import { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState({});
    const [message,setMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:3000/event/getEvent/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setEvent(response.data.data);
        })
            .catch((error) => {
                console.log("Error fetching event ", error);
            })
    
    }, [id])

    const handleDelete = async (e) => {
        const token = localStorage.getItem('token');
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/event/deleteEvent`,{id},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setMessage(response.data.msg) 
        }catch (error) {
            setMessage(error.response.data.msg)
        }
    }
    return (
        <div className="container">
            <h1 className="mt-4 mb-4">Event Detail</h1>
            <div className="list-group">
                <div className="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Title: {event.title}</h5>
                        <small>Date: {event.date}</small>
                    </div>
                    <p>Description: {event.description}</p>
                    <p>Price:{event.price}</p>
                    {<button onClick={handleDelete}>Delete This Event</button>}
                </div>
            </div>
            <p>{message}</p>
        </div>
    );
}

export default EventDetail;