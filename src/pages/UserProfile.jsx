const UserProfile = ({ handleLogout, user }) => {
    const goEdit = () => {
        window.location.replace('/edit');
    };

    return (
        <>

        <div className="row mb-5">
        <div className="col-sm-12 primarycolor">
            <h1 className="pb-2 mt-4 mb-2 border-bottom">User Profile</h1>
            <p className="h5">Username: {user.username}</p>
            <ul>
            <li>Full Name: {user.lastname}, {user.firstname}</li>
            <li>E-mail: {user.email}</li>
            <li>Mobile Number: {user.mobilenumber}</li>
            </ul>
            <br /><br />
            <button type="button" className="btn btn-primary btn-block" onClick={goEdit}>Edit Profile</button>
            <button type="button" className="btn btn-danger btn-block" onClick={handleLogout}>Log Out</button>
        </div>
        </div>

        </>
    );
};

export default UserProfile;
