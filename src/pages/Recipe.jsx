import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addRecipe, fetchRecipe, fetchRecipeByType, fetchFavorite, addFavorite, deleteFavorite } from '../api';

function Recipe({ userId }) {
    const [recipe, setRecipe] = useState(null);
    const [recipeByType, setRecipeByType] = useState(null);
    const [favorite, setFavorite] = useState(false);
    const { id } = useParams();
    const recipeType = "TheMealDB";

    const goBack = () => {
        window.location.replace('/');
    };

    useEffect(() => {
        fetchRecipe(id, setRecipe);
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

    const ingredientsDisplay = [];

    for (let i = 1; i <= 20; i++) {
        if (recipe[`strIngredient${i}`]) {
            ingredientsDisplay.push(
                `${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`
            );
        } else {
            break;
        }
    }

    const goYoutube = () => {
        window.location.replace(recipe.strYoutube);
    }

    const handleFavoriteClick = async () => {
        await addRecipe(recipe.strMeal, ingredientsDisplay.join(';;'), recipe.strInstructions, recipeType, id, recipe.strMealThumb);
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
            <a href={recipe.strMealThumb} data-toggle="lightbox" data-gallery="gallery">
                <img src={recipe.strMealThumb} alt={recipe.strMeal} className="shadow-lg img-thumbnail" />
            </a>
            <button type="button" className={favorite ? "btn btn-outline-dark btn-block" : "btn btn-outline-light btn-block"} onClick={handleFavoriteClick}>{favorite ? "Unfavorite" : "Favorite"}</button>
        </div>
        </div>

        <div className="col-sm-9 primarycolor">
            <h1>{recipe.strMeal}</h1>
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
            {recipe.strInstructions}
            </div>
            {recipe.strYoutube && (
                <>
                <br />
                <button type="button" className="btn btn-outline-light btn-block"
                onClick={goYoutube}>YouTube Tutorial</button>
                <hr />
                </>
                )
            }
            <br />
            <button className="btn btn-outline-light" onClick={goBack}>Back to Home</button>
        </div>

        </div>
        </>
    );
}

export default Recipe;
