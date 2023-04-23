import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const Home = () => {
    const [searchResults, setSearchResults] = useState([]);

    return (
        <>
        <div className="container" style={{'margin-top':'5px'}}>

        <div className="row mb-5">
        <div className="col-sm-12">
            <h1 className="pb-2 mt-4 mb-2 border-bottom">Home</h1>
            <p className="lead">Welcome to the Home page.</p>
        </div>
        </div>

        <div className="row mb-5">
        <div className="col-sm-12">
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
        </div>

        </div>
        </>
    );
};

export default Home;
