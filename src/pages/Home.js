import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const Home = () => {
    const [searchResults, setSearchResults] = useState([]);

    return (
        <>
        <div>
            <h1>Home</h1>
            <p>Welcome to the Home page!</p>
        </div>
        <div>
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
        </>
    );
};

export default Home;
