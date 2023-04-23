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
        <div className="container" style={{'margin-top':'5px'}}>

        <div class="row mb-5">
        <div class="col-sm-12">
        <h1>Register</h1>
        </div>
        </div>

        <div class="row mb-5">
        <div class="col-sm-12">
        <form onSubmit={handleRegister}>
        <div class="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" class="form-control" required />
        </div>
        <div class="form-group">
            <label htmlFor="firstname">First Name:</label>
            <input type="text" id="firstname" name="firstname" class="form-control" required />
        </div>
        <div class="form-group">
            <label htmlFor="lastname">Last Name:</label>
            <input type="text" id="lastname" name="lastname" class="form-control" required />
        </div>
        <div class="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" class="form-control" required />
        </div>
        <div class="form-group">
            <label htmlFor="mobilenumber">Mobile Number:</label>
            <input type="tel" id="mobilenumber" name="mobilenumber" class="form-control" required />
        </div>
        <div class="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" class="form-control" required />
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary pull-right">Register</button>
            {registerError && <p>{registerError}</p>}
        </div>
        </form>
        </div>
        </div>

        </div>
        </>
    );
};

export default Register;
