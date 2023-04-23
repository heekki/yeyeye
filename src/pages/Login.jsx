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
        <div className="container" style={{'margin-top':'5px'}}>

        <div className="row mb-5">
        <div className="col-sm-12">
        <h1>Login</h1>
        </div>
        </div>

        <div className="row mb-5">
        <div className="col-sm-12">
        <form onSubmit={handleLogin}>
        <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" className="form-control" required />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" className="form-control" required />
        </div>
        <div>
        <button type="submit" className="btn btn-primary pull-right">Login</button>
        {loginError && <p>{loginError}</p>}
        </div>
        </form>
        </div>
        </div>

        </div>
        </>
    );
};

export default Login;
