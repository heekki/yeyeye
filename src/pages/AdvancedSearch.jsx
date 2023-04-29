import React, { useState, useEffect } from 'react';
import { fetchAreas, fetchCategories, searchByArea, searchByCategory, openAiRequest, addRecipe } from "../api";

const AdvancedSearch = ({ user, userId }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchResults2, setSearchResults2] = useState('');
    const [areas, setAreas] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const recipeType = "User-uploaded";

    const handleSearch = async (e) => {
        e.preventDefault();
        console.log(searchTerm);
        const res = await openAiRequest(searchTerm);
        setSearchResults2(res.data.message);
        if (searchResults2) {
            const res2 = searchResults2.split('\n\nIngredients:');
            const title = res2[0].replace(/(\r\n|\n|\r)/gm, "");
            console.log(`title: ${title}`);
            const res3 = res2[1].split('\n\nInstructions');
            const ingredients = res3[0];
            const instruction = res3[1];
            console.log(`ingredients: ${ingredients}`);
            console.log(`instruction: ${instruction}`);
            addRecipe(title, ingredients, instruction, recipeType, 'https://i.imgur.com/2UvagtC.png', 0, userId, user.username)
                .then(res => {
                    console.log(res.data);
                    alert(`Recipe "${title}" has been added successfully`);
                    window.location.replace(`recipe/User-uploaded/${res.data}`);
                })
                .catch(err => {console.log(err)});
        }
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

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
            <p className="lead">Select a category or area below, or use the OpenAI search.</p>
        </div>
        </div>

        <div className="row mb-3">
        <div className="col-sm-12 primarycolor">
        <p className="h5">OpenAI Search:</p>
        <form onSubmit={handleSearch} className="input-group mb-3">
            <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Search for recipes using OpenAI" className="form-control" style={{'borderRadius':'8px 0 0 8px'}} />
            <div className="input-group-append">
            <button type="submit" className="btn btn-outline-light">Search</button>
            </div>
        </form>
        </div>
        </div>

        <div className="row mb-3">
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

        <div className="row mb-3">
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
                <a href={`/recipe/TheMealDB/${meal.idMeal}`}>
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
