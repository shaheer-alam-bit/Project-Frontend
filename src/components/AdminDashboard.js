import axios from 'axios';
import { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const [organizer,setOrganizer] = useState([]);
    const [user,setUser] = useState([]);
    const [message,setMessage] = useState("")

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:3000/accountManagement/getOrganizers', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setOrganizer(response.data.data)
            }).catch((error) => {
                setMessage(error.response.data.message)
            })
    }, [organizer]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:3000/accountManagement/getUsers', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setUser(response.data.data)
            }).catch((error) => {
                setMessage(error.response.data.message)
            })
    }, [user])

    const handleDelete = async(email) => {
        try{
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3000/accountManagement/deleteAccount', {email}, {
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
<>
    <h1>Admin Dashboard</h1>
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <div>
            <h2>Organizers</h2>
            {organizer.map(org => (
                <div key={org._id} style={{ margin: '20px', padding: '5px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', width: '300px', backgroundColor: 'lightgrey' }}>
                    <h3>{org.firstName + " " + org.lastName}</h3>
                    <p>Email: {org.email}</p>
                    <p>Status: {org.status}</p>
                    <button onClick={() => handleDelete(org.email)}>Delete Organizer</button>
                </div>
            ))}
        </div>
        <div>
            <h2>Users</h2>
            {user.map(usr => (
                <div key={usr._id} style={{ margin: '20px', padding: '5px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', width: '300px', backgroundColor: 'lightgrey' }}>
                    <h3>{usr.firstName + " " + usr.lastName}</h3>
                    <p>Email: {usr.email}</p>
                    <p>Status: {usr.status}</p>
                    <button onClick={()=> handleDelete(usr.email)}>Delete User</button>
                </div>
            ))}
        </div>
    </div>
    {message && <p>{message}</p>}
</>

    )
}

export default AdminDashboard;