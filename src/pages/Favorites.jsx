import React, { useState, useEffect } from "react";
import { getAllFavorites, getRecipe } from '../api';

const Favorites = ({ user, userId }) => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getAllFavorites(userId)
        .then(res => {
            const allFavorites = res.data;
            for (const favorite of allFavorites) {
                getRecipe(favorite.recipe_id)
                .then(res => {setRecipes(arr => [...arr, res.data])})
                .catch(err => {console.log(err)});
            }
        })
        .catch(err => {console.log(err)});
    }, [userId]);

    return (
        <>

        <div className="row mb-5">
        <div className="col-sm-12 primarycolor">
            <h1 className="pb-2 mt-4 mb-2 border-bottom">Favorites</h1>
            <p className="lead">Your list of favorite recipes:</p>
        </div>
        </div>

        <div className="row my-5 primarycolor">
            {recipes[0] ? recipes.map((meal) => (
                <div className="col-sm-3">
                <a href={`/recipe/${meal.type_id}`}>
                <h4 className="primarycolor" style={{'textAlign':'center'}}>{meal.name}</h4>
                <div key={meal.type_id} className="fakeimg">
                    <img src={meal.thumb} alt={meal.name} className="shadow" />
                    <div className="overlay">
                        <div className="text"></div>
                    </div>
                </div>
                </a>
                </div>
            )) : (
                <div className="col-sm-12 primarycolor">
                <p>No favorite recipes found.</p>
                </div>
            )}
        </div>

        </>
    );
};

export default Favorites;
