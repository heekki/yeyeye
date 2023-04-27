import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";

import { getUserInfo } from "./api";

import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Recipe from "./pages/Recipe.jsx";
import Favorites from "./pages/Favorites.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import AdvancedSearch from "./pages/AdvancedSearch.jsx";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);
    const [user, setUser] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        mobilenumber: ''
    });
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            getUserInfo(userId, setUser);
        }
    }, [userId]);

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.location.replace('/');
    };

    return (
        <Router>

        <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} user={user} />

        <div className="container" style={{'marginTop':'1.25rem'}}>

        <Switch>
        <Route path="/register">
            <Register />
        </Route>
        <Route path="/login">
            <Login setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <PrivateRoute exact path="/" isLoggedIn={isLoggedIn}>
            <Home user={user} />
        </PrivateRoute>
        <PrivateRoute path="/profile" isLoggedIn={isLoggedIn}>
            <UserProfile handleLogout={handleLogout} user={user} />
        </PrivateRoute>
        <PrivateRoute path="/recipe/:id" isLoggedIn={isLoggedIn}>
            <Recipe userId={userId} />
        </PrivateRoute>
        <PrivateRoute path="/favorites" isLoggedIn={isLoggedIn}>
            <Favorites user={user} userId={userId} />
        </PrivateRoute>
        <PrivateRoute path="/edit" isLoggedIn={isLoggedIn}>
            <EditProfile user={user} userId={userId} />
        </PrivateRoute>
        <PrivateRoute path="/search" isLoggedIn={isLoggedIn}>
            <AdvancedSearch />
        </PrivateRoute>
        </Switch>

        <Footer />

        </div>

        </Router>
    );
}

export default App;
