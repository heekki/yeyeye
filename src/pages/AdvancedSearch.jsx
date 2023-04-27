import React, { useState, useEffect } from 'react';
import { fetchAreas, fetchCategories, searchByArea, searchByCategory } from "../api";

const AdvancedSearch = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [areas, setAreas] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchAreas(setAreas);
        fetchCategories(setCategories);
    }, []);

    const goBack = () => {
        window.location.replace('/');
    };

    const goSearchArea = (area) => {
        console.log(area);
        searchByArea(area, setSearchResults);
    }

    const goSearchCategory = (category) => {
        console.log(category);
        searchByCategory(category, setSearchResults);
    }

    return (
        <>

        <div className="row mb-5">
        <div className="col-sm-12 primarycolor">
            <h1 className="pb-2 mt-4 mb-2 border-bottom">Advanced Search</h1>
            <p className="lead">Select a category or area below.</p>
        </div>
        </div>

        <div class="row mb-3">
        <div className="col-sm-12 primarycolor">
            <p className="h5">By Area:</p>
            <hr />
            <div className="btn-group d-flex flex-wrap">
            {areas.map((area) => (
                <button onClick={() => goSearchArea(area.strArea)} className="btn-outline-light">{area.strArea}</button>
            ))}
            </div>
        </div>
        </div>

        <div class="row mb-3">
        <div className="col-sm-12 primarycolor">
            <br />
            <p className="h5">By Category:</p>
            <hr />
            <div className="btn-group d-flex flex-wrap">
            {categories.map((category) => (
                <button onClick={() => goSearchCategory(category.strCategory)} className="btn-outline-light">{category.strCategory}</button>
            ))}
            </div>
        </div>
        </div>

        <div className="row my-5 primarycolor">
            {searchResults && searchResults.map((meal) => (
                <div className="col-sm-3">
                <a href={`/recipe/${meal.idMeal}`}>
                <h5 className="primarycolor" style={{'textAlign':'center'}}>{meal.strMeal}</h5>
                <div key={meal.idMeal} className="fakeimg">
                    <img src={meal.strMealThumb} alt={meal.strMeal} className="shadow" />
                    <div className="overlay">
                        <div className="text"></div>
                    </div>
                </div>
                </a>
                </div>
            ))}
            <div className="col-sm-3">
            <br />
            <button className="btn btn-outline-light" onClick={goBack}>Back to Home</button>
            </div>
        </div>

        </>
    );
};

export default AdvancedSearch;
