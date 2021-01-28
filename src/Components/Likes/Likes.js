import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const Likes = ({ likedRecipe, selectRecipeModal }) => {
  const [likedRecipes, setLikedRecipes] = useState([]);

  //Delete recipe from my favourite list
  const deleteRecipe = (id) => {
    let newArr = [...likedRecipes];
    let index = newArr.findIndex((el) => el.recipe_id === id);
    newArr.splice(index, 1);
    setLikedRecipes(newArr);
  };

  useEffect(() => {
    if (Object.entries(likedRecipe).length > 0) {
      setLikedRecipes((prevState) => {
        if (prevState.includes(likedRecipe)) {
          alert("Izabrani recept je unet");
          return prevState;
        } else {
          return prevState.concat(likedRecipe);
        }
      });
    }
  }, [likedRecipe]);

  let likes = null;
  if (likedRecipes.length > 0) {
    likes = (
      <>
        {likedRecipes.map((recipe) => {
          return (
            <div
              onClick={selectRecipeModal}
              id={recipe.recipe_id}
              key={recipe.recipe_id}
              className="liked-recipe"
            >
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="list-img"
              />
              <div className="delete-like">
                <MdDelete
                  className="delete-like-icon"
                  onClick={() => deleteRecipe(recipe.recipe_id)}
                />
              </div>
            </div>
          );
        })}
      </>
    );
  }

  return <div>{likes}</div>;
};

export default Likes;
