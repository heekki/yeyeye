const NavBar = ({ isLoggedIn, handleLogout }) => {
    return (
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
    );
};

export default NavBar;
