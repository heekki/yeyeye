import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";

import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Subpage from "./pages/Subpage";
import Recipe from "./pages/Recipe";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
    };

    return (
        <Router>
        <div>

            <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

            <Switch>
            <Route path="/login">
                <Login setIsLoggedIn={setIsLoggedIn} />
            </Route>
            <Route path="/register">
                <Register />
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

        </div>
        </Router>
    );
}

export default App;
