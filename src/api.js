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

export const searchRecipe = (searchTerm, setSearchResults) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then(response => response.json())
        .then(data => {setSearchResults(data.meals);})
        .catch(error => console.error(error));
};

export const fetchRecipe = async (id, setRecipe) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    setRecipe(data.meals[0]);
};
