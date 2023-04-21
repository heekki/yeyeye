import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
//import RecipePage from "./RecipePage";

const HomePage = ({ user, handleLogout }, props) => {
    const [searchResults, setSearchResults] = useState([]);

    return (
        <div>
            <h2>Welcome {user.firstname}!</h2>
            <SearchBar setSearchResults={setSearchResults} />
                <div className="recipe-list">
                {searchResults &&
                    searchResults.map((meal) => (
                        <div key={meal.idMeal}>
                            <Link to={`/recipe/${meal.idMeal}`}>
                                <img src={meal.strMealThumb} alt={meal.strMeal} />
                                <h3>{meal.strMeal}</h3>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default HomePage;
