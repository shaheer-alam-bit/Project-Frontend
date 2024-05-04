import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const OrganizerDashboard = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const [message,setMessage] = useState("")

    const handleCreateEvent = () => {
        navigate('/createEvent')
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:3000/event/myEvents', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setEvents(response.data.data);
        })
            .catch((error) => {
                setMessage(error.response.data.message)
            })
    }, [])
    return (
        <div className="container">
            <h1 className="mt-4 mb-4">Organizers Dashboard</h1>
            <h2 className="mb-3">Events</h2>
            <div className="list-group">
                {events.map(event => (
                    <div key={event._id} className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                            <Link style={{ textDecoration: 'none' }} to={`/event/${event._id}`}>
                                <h5 className="mb-1">Title: {event.title}</h5>
                                <small>Date: {event.date}</small>
                            </Link>
                        </div>
                        <button>
                            <Link style={{ textDecoration: 'none' , color: "white" }} to={`/updateEvent/${event._id}`}>Update Event</Link>
                        </button>
                        <p className="mb-1">Description: {event.description}</p>
                        <small>Location: {event.location}</small>
                    </div>
                ))}
            </div>
            <button className="btn btn-primary mt-4" onClick={handleCreateEvent}>
                Create New Event
            </button>
            {message && <h3 className="message">{message}</h3>}
        </div>
    );
}

export default OrganizerDashboard;