import React, { useEffect, useState } from "react";
//Icons
import { GiKnifeFork } from "react-icons/gi";
import { BsSearch } from "react-icons/bs";
//Components
import RecipeList from "./Components/RecipeList/RecipeList";
import Recipe from "./Components/Recipe/Recipe";
import Likes from "./Components/Likes/Likes";
import Loader from "./Components/Loader/Loader";
import Pagination from "./Components/Pagination/Pagination";
import Modal from "./Components/Modal/Modal";

const App = () => {
  //proxy
  const proxy = "https://cors-anywhere.herokuapp.com/";

  //STATE
  //data
  const [data, setData] = useState([]);
  //input field for search recipes
  const [input, setInput] = useState("");
  //final input for search recipes
  const [finalInput, setFinalInput] = useState("pasta");

  //Liked recipe
  const [likedRecipe, setLikedRecipe] = useState({});
  // Modal recipe
  const [modalRecipe, setModalRecipe] = useState({});
  //Loader
  const [loader, setLoader] = useState(false);
  //Selected Recipe
  const [selectedRecipe, setSelectedRecipe] = useState({});
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(7);

  //Get Recipes -request for recipes
  const getRecipes = async () => {
    try {
      setLoader(true);
      const response = await fetch(
        `${proxy}https://forkify-api.herokuapp.com/api/search?q=${finalInput}`
      );
      const recipes = await response.json();
      setData(recipes.recipes);
      setInput("");
    } catch (err) {
      console.log("Something went wrong with API");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getRecipes();
  }, [finalInput]);

  //Search for Recipes (example: pizza,pasta...)
  const searchForRecipes = (e) => {
    e.preventDefault();
    setFinalInput(input);
  };

  //Select One Recipe from List (example: List of pizza or pasta recipes. You can
  //choose one of those and display on UI)
  const selectRecipe = (e) => {
    const id = e.target.closest(".recipe").id;
    const selectedRecipe = data.filter((el) => el.recipe_id === id)[0];
    setSelectedRecipe(selectedRecipe);
  };

  //Like Recipe-for My fourite recipes(when you click on heart icon)
  const likeRecipe = (e) => {
    //ID of liked recipe
    let id = e.target.parentElement.parentElement.closest(
      ".main-recipe-section"
    ).id;

    //Liked recipe (this returns one object of recipe with all properties)
    let findLikedRecipe = data.find((el) => el.recipe_id === id);

    setLikedRecipe(findLikedRecipe);
  };

  //Select liked recipe for modal
  const selectRecipeModal = (e) => {
    let id = e.target.closest(".liked-recipe").id;
    let findModalRecipe = data.find((el) => el.recipe_id === id);
    setModalRecipe(findModalRecipe);
  };

  //Delete modal
  const deleteModal = ()=> {
    setModalRecipe({})
  }

  //Pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastPost = postPerPage * currentPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  //Loader
  let loaderComponent = null;
  if (loader) {
    loaderComponent = (
      <div>
        <Loader />
      </div>
    );
  }
  let modal = null;
  if (Object.entries(modalRecipe).length > 0) {
    modal = (
      <div className="recipe-modal">
        <Modal modalRecipe={modalRecipe} deleteModal={deleteModal} />
      </div>
    );
  }

  return (
    <div className="container">
      <header id="header">
        <div className="logo-section">
          <GiKnifeFork className="logo" />
          <span className="logo-text">Recipes</span>
        </div>
        <div className="search-bar">
          <form onSubmit={searchForRecipes}>
            <input
              type="text"
              placeholder="Search over 3,000 recipes..."
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={input}
            />
            <button className="main-btn" type="submit">
              <BsSearch />
              <span>Search</span>
            </button>
          </form>
        </div>
        <div className="like-list">
          <span>Favourite</span>
        </div>
      </header>

      {/*Sections*/}
      <section id="body-app">
        <div className="recipes-list">
          {loaderComponent}
          <RecipeList data={currentPosts} selectRecipe={selectRecipe} />
          <Pagination
            currentPage={currentPage}
            data={data}
            postPerPage={postPerPage}
            paginate={paginate}
          />
        </div>
        <div className="main-recipe">
          <Recipe selectedRecipe={selectedRecipe} likeRecipe={likeRecipe} />
        </div>
        <div className="likes-list">
          <Likes
            likedRecipe={likedRecipe}
            selectRecipeModal={selectRecipeModal}
          />
        </div>
      </section>
      {modal}
    </div>
  );
};

export default App;
