import { useHistory, useLocation } from 'react-router-dom';
import { login } from '../api';

const Login = ({ setIsLoggedIn }) => {
    const history = useHistory();
    const location = useLocation();

    const handleLogin = async (e) => {
        e.preventDefault();
        const { username, password } = e.target.elements;
        login(username.value, password.value)
        .then((response) => {
            setIsLoggedIn(true);
            localStorage.setItem('token', response.data.token);
            const { from } = location.state || { from: { pathname: '/' } };
            history.replace(from);
        })
        .catch((error) => {
            alert(error);
        });
    };

    return (
        <>
        <div className="container" style={{'marginTop':'2rem'}}>

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
        <div className="text-right">
            <button type="submit" className="btn btn-primary">Login</button>
        </div>
        </form>
        </div>
        </div>

        </div>
        </>
    );
};

export default Login;
