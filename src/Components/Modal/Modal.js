import React from "react";

const Modal = ({ modalRecipe, deleteModal }) => {
  let modal = null;
  if (Object.entries(modalRecipe).length > 0) {
    console.log(modalRecipe);
    modal = (
      <div id={modalRecipe.recipe_id} className="modal">
        <div className="modal-img">
          <img alt="modal-img" src={modalRecipe.image_url} />
        </div>
        <div className="modal-info">
          <h2>{modalRecipe.title}</h2>
          <h4>{modalRecipe.publisher}</h4>
          <p>
            This is <span>{modalRecipe.title}.</span>
            This recipe was carefully designed and tested by
            <span>{modalRecipe.publisher}.</span> Please check out directions at
            their website.
          </p>
        </div>
        <button onClick={deleteModal} className="btn-delete">
          hide
        </button>
      </div>
    );
  }
  return modal;
};

export default Modal;
