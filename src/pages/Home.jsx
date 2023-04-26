import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';

const Home = ({ user }) => {
    const [searchResults, setSearchResults] = useState([]);

    const goAdvancedSearch = () => {
        window.location.replace('/search');
    };

    const goRandomRecipe = () => {
        window.location.replace('/random');
    };

    console.log(user);

    return (
        <>

        <div className="row mb-5">
        <div className="col-sm-12 primarycolor">
            <h1 className="pb-2 mt-4 mb-2 border-bottom">Home</h1>
            <p className="lead">Welcome, {user.firstname}. ({user.username})</p>
        </div>
        </div>

        <SearchBar setSearchResults={setSearchResults} />
        <div className="row my-5 primarycolor">
            {searchResults && searchResults.map((meal) => (
                <div className="col-sm-3">
                <a href={`/recipe/${meal.idMeal}`}>
                <h4 className="primarycolor" style={{'text-align':'center'}}>{meal.strMeal}</h4>
                <div key={meal.idMeal} className="fakeimg">
                    <img src={meal.strMealThumb} alt={meal.strMeal} className="shadow" />
                    <div className="overlay">
                        <div className="text"></div>
                    </div>
                </div>
                </a>
                </div>
            ))}
        </div>

        <div className="row mb-5">
        <div className="col-sm-12">
            <button type="button" className="btn btn-outline-dark btn-block" onClick={goAdvancedSearch}>Advanced Search</button>
            <button type="button" className="btn btn-outline-dark btn-block" onClick={goRandomRecipe}>Random Recipe</button>
        </div>
        </div>

        </>
    );
};

export default Home;
