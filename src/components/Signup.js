import { useState } from 'react';
import axios from 'axios';
import '../styles/signup.css'; // Import the CSS file

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', {
                email,
                password,
                role,
                firstName,
                lastName
            });
            console.log(response.data);
            setMessage("Successfully Signed up...");
        } catch (error) {
            console.log(error);
            setMessage("Error in signing up...");
        }
    }
    return (
        <div className="signup-container">
            <h2>Signup Page</h2>
            <form className="signup-form">
                <label>
                    First Name:
                    <input type="text" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </label>
                <br />
                <label>
                    Last Name:
                    <input type="text" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <div>
                    <label>
                        Role:
                    </label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="user"
                                checked={role === 'user'}
                                onChange={() => setRole('user')}
                            />
                            User
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="admin"
                                checked={role === 'admin'}
                                onChange={() => setRole('admin')}
                            />
                            Admin
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="organizer"
                                checked={role === 'organizer'}
                                onChange={() => setRole('organizer')}
                            />
                            Organizer
                        </label>
                    </div>
                </div>
                <button onClick={handleSignup}>
                    Signup
                </button>
                {message && <p className={message.includes('Error') ? 'signup-error' : 'signup-message'}>{message}</p>}
            </form>
        </div>
    )
}

export default Signup;
