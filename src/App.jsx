import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";

import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Subpage from "./pages/Subpage.jsx";
import Recipe from "./pages/Recipe.jsx";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.location.replace('/');
    };

    return (
        <Router>
        <div>

            <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

            <Switch>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/login">
                <Login setIsLoggedIn={setIsLoggedIn} />
            </Route>
            <PrivateRoute exact path="/" isLoggedIn={isLoggedIn}>
                <Home />
            </PrivateRoute>
            <PrivateRoute path="/subpage" isLoggedIn={isLoggedIn}>
                <Subpage />
            </PrivateRoute>
            <PrivateRoute path="/recipe/:id" isLoggedIn={isLoggedIn}>
                <Recipe />
            </PrivateRoute>
            </Switch>

            <Footer />

        </div>
        </Router>
    );
}

export default App;
