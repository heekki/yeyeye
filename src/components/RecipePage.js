import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function RecipePage(props) {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${props.id}`
      );
      const data = await response.json();
      setRecipe(data.meals[0]);
    };

    fetchRecipe();
  }, [props.id]);

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
    <div className="recipe">
      <h2>{recipe.strMeal}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>Ingredients:</h3>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{recipe.strInstructions}</p>
      <Link to="/">Back to Search Results</Link>
    </div>
  );
}

export default RecipePage;
