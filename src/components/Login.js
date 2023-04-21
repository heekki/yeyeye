import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { login } from '../api';

const Login = ({ setIsLoggedIn }) => {
    const [loginError, setLoginError] = useState('');

    const history = useHistory();
    const location = useLocation();

    const handleLogin = async (e) => {
        e.preventDefault();
        const { username, password } = e.target.elements;
        login(username.value, password.value)
        .then((response) => {
            setLoginError(null);
            setIsLoggedIn(true);
            localStorage.setItem('token', response.data.token);
            const { from } = location.state || { from: { pathname: '/' } };
            history.replace(from);
        })
        .catch((error) => {
            setLoginError(error.response.data.message);
        });
    };

    return (
        <>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
        <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
        </div>
        <div>
        <button type="submit">Login</button>
        {loginError && <p>{loginError}</p>}
        </div>
        </form>
        </>
    );
};

export default Login;
