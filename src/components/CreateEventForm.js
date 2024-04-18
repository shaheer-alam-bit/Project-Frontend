import { useState } from 'react';
import axios from 'axios';
import '../styles/EventForm.css';

const CreateEventForm = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:3000/event/createEvent', {
        title,
        date,
        description,
        location,
        price
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      setMessage("Event created successfully...");
    } catch (error) {
      console.log("Error in creating event ", error);
      setError("Error in creating event");
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input type="date" placeholder='Select Date' value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input type="text" placeholder='Enter Location' value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input type="number" placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <button type="submit">Create Event</button>
        {message && <p className="message">{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default CreateEventForm;
