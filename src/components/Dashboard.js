import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:3000/event/getEvents', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            
            setEvents(response.data.data);
        })
            .catch((error) => {
                console.log("Error fetching events ", error);
            })
    }, [])
    return (
        <div className="container">
            <h1 className="mt-4 mb-4">User Dashboard</h1>
            <h2 className="mb-3">Events</h2>
            <div className="list-group">   
                {events.map(event => (
                    <div key={event._id} className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                            <Link style={{textDecoration:'none'}} to={`/event/${event._id}`}>
                                <h5 className="mb-1">Title: {event.title}</h5>
                                <small>Date: {event.date}</small>
                            </Link>
                        </div>
                        <small>Location: {event.location}</small>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;