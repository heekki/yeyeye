import React, { useState, useEffect } from "react";
import { getRecipesByType, getRecipe } from '../api';

const UploadedRecipes = ({ user, userId }) => {
    const [recipes, setRecipes] = useState([]);
    const recipeType = "User-uploaded";

    useEffect(() => {
        getRecipesByType(recipeType)
        .then(res => {
            const allRecipes = res.data;
            console.log(allRecipes);
            for (const rec of allRecipes) {
                getRecipe(rec.id)
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
            <h1 className="pb-2 mt-4 mb-2 border-bottom">Recipes</h1>
            <p className="lead">List of all uploaded recipes:</p>
        </div>
        </div>

        <div className="row my-5 primarycolor">
            {recipes[0] ? recipes.map((meal) => (
                <div className="col-sm-3">
                <a href={`/recipe/${meal.type}/${meal.type_id}`}>
                <h4 className="primarycolor" style={{'textAlign':'center'}}>{meal.name}</h4>
                <p className="h6 primarycolor" style={{'textAlign':'center'}}>By {meal.username}</p>
                <div key={meal.type_id} className="fakeimg">
                    <img src={meal.thumb} alt={meal.name} className="shadow fakeimga" />
                    <div className="overlay">
                        <div className="text"></div>
                    </div>
                </div>
                </a>
                </div>
            )) : (
                <div className="col-sm-12 primarycolor">
                <p>No user-uploaded recipes found.</p>
                </div>
            )}
        </div>

        </>
    );
};

export default UploadedRecipes;
