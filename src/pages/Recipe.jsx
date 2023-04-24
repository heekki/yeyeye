import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchRecipe } from '../api';

function Recipe() {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetchRecipe(id, setRecipe);
    }, [id]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (recipe[`strIngredient${i}`]) {
            ingredients.push(
                `${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`
            );
        } else {
            break;
        }
    }

    return (
        <>
        <div className="container" style={{'marginTop':'2rem'}}>

        <div className="row mb-5">

        <div className="col-sm-4">
        <div className="fakeimg2 img-hover">
            <a href={recipe.strMealThumb} data-toggle="lightbox" data-gallery="gallery">
                <img src={recipe.strMealThumb} alt={recipe.strMeal} className="shadow-lg img-thumbnail" />
            </a>
        </div>
        </div>

        <div className="col-sm-8">
            <h1>{recipe.strMeal}</h1>
            <hr />
            <h4>Ingredients:</h4>
            <ul>
                {ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                ))}
            </ul>
            <hr />
            <h4>Instructions:</h4>
            <div style={{'whiteSpace':'pre-line'}}>
            {recipe.strInstructions}
            </div>
        </div>

        </div>

        <div className="row mb-5">
        <Link to="/">Back to Search</Link>
        </div>

        </div>
        </>
    );
}

export default Recipe;
