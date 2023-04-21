import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const RegistrationPage = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        password: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/register', formData);
            console.log(response.data);
            history.push('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Registration Page</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="mobileNumber">Mobile Number:</label>
                    <input type="tel" id="mobileNumber" name="mobileNumber" onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" onChange={handleInputChange} required />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegistrationPage;
