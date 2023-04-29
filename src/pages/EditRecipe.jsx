import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getRecipe, updateRecipe } from '../api';

const EditRecipe = ({ userId }) => {
    const [recipeForm, setRecipeForm] = useState({
        name: '',
        ingredients: '',
        instruction: '',
        thumb: ''
    });
    const { id } = useParams();

    useEffect(() => {
        getRecipe(id)
            .then(res => {setRecipeForm(res.data)})
            .catch(err => {console.log(err)});
    }, []);

    const handleInputChange = (e) => {
        setRecipeForm({
            ...recipeForm,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, ingredients, instruction, thumb } = e.target.elements;
        updateRecipe(id, name.value, ingredients.value, instruction.value, thumb.value)
        .then((response) => {
            console.log(response);
            alert(`Recipe "${name.value}" has been edited successfully.`);
            window.location.replace(`/recipe/edit/${id}`);
        })
        .catch((error) => {
            alert(error);
        });
    };

    if (recipeForm.user_id) {
        if (userId != recipeForm.user_id) {
            window.location.replace('/');
        }
    }

    return (
        <>

        <div className="row mb-5">
        <div className="col-sm-12 primarycolor">
        <h1>Edit Recipe</h1>
        </div>
        </div>

        <div className="row mb-5">
        <div className="col-sm-12 primarycolor">
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="name">Recipe Name:</label>
            <input type="text" id="name" name="name" className="form-control" value={recipeForm.name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
            <label htmlFor="ingredients">Ingredients:</label>
            <textarea id="ingredients" name="ingredients" className="form-control" value={recipeForm.ingredients} onChange={handleInputChange} required></textarea>
        </div>
        <div className="form-group">
            <label htmlFor="instruction">Instructions:</label>
            <textarea id="instruction" name="instruction" className="form-control" value={recipeForm.instruction} onChange={handleInputChange} required></textarea>
        </div>
        <div className="form-group">
            <label htmlFor="thumb">Thumbnail Image Link:</label>
            <input type="text" id="thumb" name="thumb" className="form-control" value={recipeForm.thumb} onChange={handleInputChange} required />
        </div>
        <div className="text-right">
            <button type="submit" className="btn btn-outline-light">Edit</button>
        </div>
        </form>
        </div>
        </div>

        </>
    );
};

export default EditRecipe;
