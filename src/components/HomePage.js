import React, { useState } from 'react';
import SearchBar from './SearchBar';

const HomePage = ({ user, handleLogout }, props) => {
  const [recipes, setRecipes] = useState([]);

  return (
    <div>
      <h2>Welcome {user.firstname}!</h2>
      <SearchBar setSearchResults={setRecipes} />
      <div>
        {recipes &&
          recipes.map((recipe) => (
            <div key={recipe.idMeal}>
              <h3>{recipe.strMeal}</h3>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
