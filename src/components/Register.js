import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { register } from '../api';

const Register = ({ setIsLoggedIn }) => {
    const [registerError, setRegisterError] = useState('');

    const history = useHistory();
    const location = useLocation();

    const handleRegister = async (e) => {
        e.preventDefault();
        const { username, firstname, lastname, email, mobilenumber, password } = e.target.elements;
        register(username.value, firstname.value, lastname.value, email.value, mobilenumber.value, password.value)
        .then((response) => {
            setRegisterError(null);
            setIsLoggedIn(true);
            localStorage.setItem('token', response.data.token);
            const { from } = location.state || { from: { pathname: '/' } };
            history.replace(from);
        })
        .catch((error) => {
            setRegisterError(error.response.data.message);
        });
    };

    return (
        <>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
        <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
        </div>
        <div>
            <label htmlFor="firstname">First Name:</label>
            <input type="text" id="firstname" name="firstname" required />
        </div>
        <div>
            <label htmlFor="lastname">Last Name:</label>
            <input type="text" id="lastname" name="lastname" required />
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
        </div>
        <div>
            <label htmlFor="mobilenumber">Mobile Number:</label>
            <input type="tel" id="mobilenumber" name="mobilenumber" required />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
        </div>
        <div>
            <button type="submit">Register</button>
            {registerError && <p>{registerError}</p>}
        </div>
        </form>
        </>
    );
};

export default Register;
