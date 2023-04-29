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

export const addRecipe = (name, ingredients, instruction, type, thumb, typeId, userId, username) =>
    api.post('/recipes', { name, ingredients, instruction, type, thumb, typeId, userId, username });

export const updateRecipe = (id, name, ingredients, instruction, thumb) => api.put(`/recipes/${id}`, { name, ingredients, instruction, thumb });

export const getRecipe = (id) => api.get(`/recipes/${id}`);

export const deleteRecipe = (id) => api.delete(`/recipes/${id}`)

export const getRecipesByType = (type) => api.get(`/recipes/type/${type}`);

export const getAllFavorites = (userId) => api.get(`/users/${userId}/favorites`);

export const fetchRecipeByType = (type, typeId, setRecipeByType) => {
    api.get(`/recipes/${type}/${typeId}`)
        .then(res => {setRecipeByType(res.data);})
        .catch(err => {console.log(err)});
};

export const fetchFavorite = (userId, recipeId, setFavorite) => {
    api.get(`/users/${userId}/favorites/${recipeId}`)
        .then(res => {setFavorite(res.data ? true : false);})
        .catch(err => {console.log(err)});
};

export const addFavorite = (userId, recipeId) => api.post(`/users/${userId}/favorites`, { recipeId });

export const deleteFavorite = (userId, recipeId) => api.delete(`/users/${userId}/favorites/${recipeId}`);

export const getDiscuss = (id) => api.get(`/discuss/${id}`);

export const addDiscuss = (recipeId, userId, message, username) => api.post(`/discuss/${recipeId}`, { userId, message, username });

export const updateDiscuss = (id, message) => api.put(`/discuss/${id}`, { message });

export const deleteDiscuss = (id) => api.delete(`/discuss/${id}`);

export const openAiRequest = async (request) => await api.post('/openai', { request });

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

export const fetchRandom = async () => {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await res.json();
    window.location.replace(`/recipe/TheMealDB/${data.meals[0].idMeal}`);
};

export const fetchAreas = async (setAreas) => {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const data = await res.json();
    setAreas(data.meals);
};

export const fetchCategories = async (setCategories) => {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await res.json();
    setCategories(data.meals);
};

export const searchByArea = (area, setSearchResults) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
        .then(res => res.json())
        .then(data => {setSearchResults(data.meals);})
        .catch(error => console.error(error));
};

export const searchByCategory = (category, setSearchResults) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(res => res.json())
        .then(data => {setSearchResults(data.meals);})
        .catch(error => console.error(error));
};

