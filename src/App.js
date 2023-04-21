import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Subpage from "./components/Subpage";
import Recipe from "./components/Recipe";
import PrivateRoute from "./components/PrivateRoute";
import { useState } from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
    };

    return (
        <Router>
        <div>
            <nav>
            <ul>
                <li>
                <a href="/">Home</a>
                </li>
                {isLoggedIn ? (
                <li>
                    <a href="/subpage">Subpage</a>
                </li>
                ) : null}
                {isLoggedIn ? (
                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>
                ) : (
                <>
                    <li>
                    <a href="/login">Login</a>
                    </li>
                    <li>
                    <a href="/register">Register</a>
                    </li>
                </>
                )}
            </ul>
            </nav>

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
