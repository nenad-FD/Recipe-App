import React from "react";

const RecipeList = ({ data, selectRecipe }) => {
  const recipes = data.map((recipe) => {
    return (
      <div
        key={recipe.recipe_id}
        id={recipe.recipe_id}
        className="recipe"
        onClick={selectRecipe}
      >
        <img src={recipe.image_url} alt={recipe.title} className="list-img" />
        <div className="recipe-title">
          <h4>{recipe.publisher}</h4>
          <p>{recipe.title.substring(0, 15)}...</p>
        </div>
      </div>
    );
  });
  return <div>{recipes}</div>;
};

export default RecipeList;
