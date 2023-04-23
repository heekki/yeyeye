import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const Home = () => {
    const [searchResults, setSearchResults] = useState([]);

    return (
        <>
        <div className="container" style={{'marginTop':'1.5rem'}}>

        <div className="row mb-5">
        <div className="col-sm-12">
            <h1 className="pb-2 mt-4 mb-2 border-bottom">Home</h1>
            <p className="lead">Welcome to the Home page.</p>
        </div>
        </div>

        <SearchBar setSearchResults={setSearchResults} />
        <div className="row my-5">
            {searchResults && searchResults.map((meal) => (
                <div className="col-sm-3">
                <Link to={`/recipe/${meal.idMeal}`}>
                <h4 style={{'text-align':'center'}}>{meal.strMeal}</h4>
                <div key={meal.idMeal} className="fakeimg">
                    <img src={meal.strMealThumb} alt={meal.strMeal} className="shadow" />
                    <div class="overlay">
                        <div class="text"></div>
                    </div>
                </div>
                </Link>
                </div>
            ))}
        </div>

        </div>
        </>
    );
};

export default Home;
