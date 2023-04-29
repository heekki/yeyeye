import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipe, fetchRecipeByType, fetchFavorite, addFavorite, deleteFavorite } from '../api';

function Recipe2({ userId }) {
    const [recipe, setRecipe] = useState(null);
    const [recipeByType, setRecipeByType] = useState(null);
    const [favorite, setFavorite] = useState(false);
    const { id } = useParams();
    const recipeType = "User-uploaded";

    const goBack = () => {
        window.location.replace('/');
    };

    useEffect(() => {
        getRecipe(id, setRecipe)
            .then(res => {setRecipe(res.data)})
            .catch(err => {console.log(err)});
        if (recipeByType) {
            fetchFavorite(userId, recipeByType.id, setFavorite);
        } else {
            fetchRecipeByType(recipeType, id, setRecipeByType);
        }
    }, [userId, id, recipeByType]);

    if (!recipe) {
        return (
            <div className="row mb-5">
            <div className="col-sm-12 primarycolor">
            Loading...
            </div>
            </div>
        );
    }

    const ingredientsDisplay = recipe.ingredients.split("\n");

    const handleFavoriteClick = async () => {
        await fetchRecipeByType(recipeType, id, setRecipeByType);
        try {
            if (!favorite) {
                await addFavorite(userId, recipeByType.id);
                setFavorite(true);
            } else {
                await deleteFavorite(userId, recipeByType.id);
                setFavorite(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
        <div className="row mb-5">

        <div className="col-sm-3">
        <div className="fakeimga img-hover">
            <a href={recipe.thumb} data-toggle="lightbox" data-gallery="gallery">
                <img src={recipe.thumb} alt={recipe.name} className="shadow-lg img-thumbnail" />
            </a>
            <button type="button" className={favorite ? "btn btn-outline-dark btn-block" : "btn btn-outline-light btn-block"} onClick={handleFavoriteClick}>{favorite ? "Unfavorite" : "Favorite"}</button>
        </div>
        </div>

        <div className="col-sm-9 primarycolor">
            <h1>{recipe.name}</h1>
            <hr />
            <h4>Ingredients:</h4>
            <ul>
                {ingredientsDisplay.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                ))}
            </ul>
            <hr />
            <h4>Instructions:</h4>
            <div style={{'whiteSpace':'pre-line'}}>
            {recipe.instruction}
            </div>
            <br />
            <button className="btn btn-outline-light" onClick={goBack}>Back to Home</button>
        </div>

        </div>
        </>
    );
}

export default Recipe2;
