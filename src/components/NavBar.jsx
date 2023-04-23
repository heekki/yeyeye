const NavBar = ({ isLoggedIn, handleLogout }) => {
    return (
        <nav className="navbar navbar-expand-lg bg-light navbar-light">
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
                    <a className="nav-link" href="/subpage">Subpage</a>
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
