import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../api';

const NavBar = ({ isLoggedIn, handleLogout }) => {
    const [user, setUser] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        mobilenumber: ''
    });

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            getUserInfo(userId)
                .then(res => {setUser(res.data);})
                .catch(err => {console.log(err)});
        }
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top gradient-3" style={{'backgroundColor':'#e3f2fd'}}>
            <a className="navbar-brand" href="/">Food App</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
                </li>
                {isLoggedIn ? (
                <li className="nav-item">
                    <a className="nav-link" href="/subpage">{user.firstname} ({user.username})</a>
                </li>
                ) : null}
                {isLoggedIn ? (
                <li className="nav-item">
                    <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
                </li>
                ) : (
                <>
                    <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/register">Register</a>
                    </li>
                </>
                )}
            </ul>
            </div>
        </nav>
    );
};

export default NavBar;
