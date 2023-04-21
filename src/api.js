import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const register = (username, firstname, lastname, email, mobilenumber, password) =>
    api.post('/register', { username, firstname, lastname, email, mobilenumber, password });

export const login = (username, password) => api.post('/login', { username, password });
