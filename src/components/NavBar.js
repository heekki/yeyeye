const NavBar = ({ isLoggedIn, handleLogout }) => {
    return (
        <nav class="navbar navbar-expand-lg bg-light navbar-light">
            <a class="navbar-brand" href="/">Food App</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav">
                <li class="nav-item">
                <a class="nav-link" href="/">Home</a>
                </li>
                {isLoggedIn ? (
                <li class="nav-item">
                    <a class="nav-link" href="/subpage">Subpage</a>
                </li>
                ) : null}
                {isLoggedIn ? (
                <li class="nav-item">
                    <button class="nav-link" onClick={handleLogout}>Logout</button>
                </li>
                ) : (
                <>
                    <li class="nav-item">
                    <a class="nav-link" href="/login">Login</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="/register">Register</a>
                    </li>
                </>
                )}
            </ul>
            </div>
        </nav>
    );
};

export default NavBar;
