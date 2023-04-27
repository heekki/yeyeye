import React, { useState, useEffect } from 'react';
import { updateUserInfo } from '../api';

const EditProfile = ({ user, userId }) => {
    const [userForm, setUserForm] = useState({
        firstname: '',
        lastname: '',
        email: '',
        mobilenumber: ''
    });

    const goBack = () => {
        window.location.replace('/profile');
    };

    useEffect(() => {
        setUserForm(user);
    }, [user]);

    const handleInputChange = (e) => {
        setUserForm({
            ...userForm,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserInfo(userId, userForm)
        .then(res => {
            console.log(res.data);
            //alert(res.data);
            window.location.replace('/profile')
        })
        .catch(err => {
            console.log(err);
            alert(err);
        });
    };

    return (
        <>

        <div className="row mb-5">
        <div className="col-sm-12 primarycolor">
        <h1 className="pb-2 mt-4 mb-2 border-bottom">Edit User Profile</h1>
        <p className="h5">Username: {user.username}</p>
        </div>
        </div>

        <div className="row mb-5">
        <div className="col-sm-12 primarycolor">
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="firstname">First Name:</label>
            <input
            type="text"
            id="firstname"
            name="firstname"
            value={userForm.firstname}
            onChange={handleInputChange} className="form-control" required
            />
        </div>
        <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
            type="text"
            id="lastname"
            name="lastname"
            value={userForm.lastname}
            onChange={handleInputChange} className="form-control" required
            />
        </div>
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
            type="email"
            id="email"
            name="email"
            value={userForm.email}
            onChange={handleInputChange} className="form-control" required
            />
        </div>
        <div className="form-group">
            <label htmlFor="mobilenumber">Mobile Number</label>
            <input
            type="tel"
            id="mobilenumber"
            name="mobilenumber"
            value={userForm.mobilenumber}
            onChange={handleInputChange} className="form-control" required
            />
        </div>
        <div className="text-right">
            <button onClick={goBack} className="btn btn-danger mr-2 px-3">Discard</button>
            <button type="submit" className="btn btn-outline-light px-3">Save</button>
        </div>
        </form>
        </div>
        </div>

        </>
    );
};

export default EditProfile;
