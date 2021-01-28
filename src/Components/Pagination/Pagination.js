import React from "react";

const Pagination = ({ data, currentPage, postPerPage, paginate }) => {
  const changePage = (e) => {
    let typePage = e.target.id;
    let num = currentPage;
    if (typePage === "prev") {
      num = num - 1;
    } else if (typePage === "next") {
      num = num + 1;
    }
    console.log(num);
    paginate(num);
  };

  let pagination = null;
  if (currentPage === 1) {
    pagination = (
      <>
        <button className="next-btn" onClick={changePage} id="next">
          Next
        </button>
      </>
    );
  } else if (Math.ceil(data.length / postPerPage) === currentPage) {
    pagination = (
      <>
        <button className="prev-btn" onClick={changePage} id="prev">
          Prev
        </button>
      </>
    );
  } else {
    pagination = (
      <>
        <button className="prev-btn" onClick={changePage} id="prev">
          Prev
        </button>
        <button className="next-btn" onClick={changePage} id="next">
          Next
        </button>
      </>
    );
  }

  return <div>{pagination}</div>;
};

export default Pagination;
