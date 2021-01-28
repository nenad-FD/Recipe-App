import React, { useState, useEffect } from "react";
//Icons
import { FiHeart } from "react-icons/fi";
import { BsClock, BsPencil } from "react-icons/bs";
import { IoIosMan } from "react-icons/io";
import { RiStarSFill } from "react-icons/ri";

const Recipe = ({ likeRecipe, selectedRecipe }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
  }, [selectedRecipe]);

  const showText = () => {
    setShow(!show);
  };

  let recipe = null;
  console.log(selectedRecipe);
  if (Object.entries(selectedRecipe).length > 0) {
    recipe = (
      <div id={selectedRecipe.recipe_id} className="main-recipe-section">
        <div className="recipe-img">
          <img alt="recipe" src={selectedRecipe.image_url} />
          <FiHeart className="heart" onClick={likeRecipe} />
        </div>
        <div className="line-point">
          <div className="line"></div>
          <div className="point"></div>
          <div className="point"></div>
        </div>

        <div className="recipe-info">
          <ul>
            <li onClick={showText}>Description</li>
            <li>Ingredients</li>
            <li>Info</li>
            <li>
              <RiStarSFill className="star" />
              <RiStarSFill className="star" />
              <RiStarSFill className="star" />
              <RiStarSFill className="star" />
              <RiStarSFill className="star" />
            </li>
          </ul>
        </div>
        <div className="recipe-time-person">
          <div className="recipe-info-time">
            <BsClock className="time-person" />
            <span> 30 minutes</span>
          </div>
          <div className="recipe-info-persons">
            <IoIosMan className="time-person" />
            <span>4 servings</span>
          </div>
        </div>
        <div className="recipe-directions">
          <h3>How to cook it</h3>
          <p>
            This is <span>{selectedRecipe.title}.</span>
            This recipe was carefully designed and tested by
            <span>{selectedRecipe.publisher}.</span> Please check out directions
            at their website.
          </p>
        </div>
        {show && (
          <div className="recipe-description">
            <ul>
              <li>
                <BsPencil /> Lorem ipsum dolor
              </li>
              <li>
                <BsPencil /> Lorem ipsum dolor
              </li>
              <li>
                <BsPencil /> Lorem ipsum dolor
              </li>
              <li>
                <BsPencil /> Lorem ipsum dolor
              </li>
              <li>
                <BsPencil /> Lorem ipsum dolor
              </li>
              <li>
                <BsPencil /> Lorem ipsum dolor
              </li>
              <li>
                <BsPencil /> Lorem ipsum dolor
              </li>
              <li>
                <BsPencil /> Lorem ipsum dolor
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }

  return <div>{recipe}</div>;
};

export default Recipe;
