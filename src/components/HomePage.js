import React, { useState } from 'react';
import SearchBar from './SearchBar';
import RecipePage from "./RecipePage";

const HomePage = ({ user, handleLogout }, props) => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div>
      <h2>Welcome {user.firstname}!</h2>
      <SearchBar setSearchResults={setSearchResults} />
        <div className="recipe-list">
        {searchResults &&
          searchResults.map((meal) => (
            <RecipePage
              key={meal.idMeal}
              id={meal.idMeal}
              name={meal.strMeal}
              image={meal.strMealThumb}
              category={meal.strCategory}
            />
          ))}
      </div>
    </div>
  );
};

export default HomePage;
