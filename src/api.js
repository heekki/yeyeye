import axios from 'axios';

const host = window.location.hostname;
const port = 4000;

const api = axios.create({
    baseURL: `http://${host}:${port}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// axios api
export const register = (username, firstname, lastname, email, mobilenumber, password) =>
    api.post('/register', { username, firstname, lastname, email, mobilenumber, password });

export const login = (username, password) => api.post('/login', { username, password });

export const getUserInfo = (id) => api.get(`/users/${id}`);

export const updateUserInfo = (id, formData) => api.put(`/users/${id}`, formData);

export const saveRecipe = (name, ingredients, instruction) => api.post('/recipes', { name, ingredients, instruction });

export const updateRecipe = (id, name, ingredients, instruction) => api.put(`/recipes/${id}`, { name, ingredients, instruction });

export const deleteRecipe = (id) => api.delete(`/recipes/${id}`)

export const addFavorite = (userId, recipeId) => api.post(`/users/${userId}/favorites`);

export const deleteFavorite = (userId, recipeId) => api.delete(`/users/${userId}/favorites/${recipeId}`);

// themealdb api
export const searchRecipe = (searchTerm, setSearchResults) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then(res => res.json())
        .then(data => {setSearchResults(data.meals);})
        .catch(error => console.error(error));
};

export const fetchRecipe = async (id, setRecipe) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    setRecipe(data.meals[0]);
};
