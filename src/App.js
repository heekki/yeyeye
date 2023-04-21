import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import RegistrationPage from './components/RegistrationPage';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div>
        <h1>My App</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {!authenticated && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {authenticated && (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/login">
            <LoginPage setAuthenticated={setAuthenticated} setUser={setUser} />
          </Route>
          <Route path="/register">
            <RegistrationPage />
          </Route>
          <Route path="/">
            {authenticated ? <HomePage user={user} handleLogout={handleLogout} /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
