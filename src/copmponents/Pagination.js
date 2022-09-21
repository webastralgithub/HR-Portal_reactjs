import React from "react";

const Pagination = (props) => {
  const pageNumbers = []
  for(let i=1;i<=props.nPages;i++){
      pageNumbers.push(i)
  } 
  console.log(pageNumbers)

  const nextPage = () => {
    if (props.currentPage !== props.nPages)
      props.setCurrentPage(props.currentPage + 1);
  };
  const prevPage = () => {
    if (props.currentPage !== 1) props.setCurrentPage(props.currentPage - 1);
  };

  return (
    <>
      <nav>
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button className="page-link" onClick={prevPage} href="#">
              Previous
            </button>
          </li>
          {pageNumbers.map((pgNumber) => (
            <li
              key={pgNumber}
              className={`page-item ${
                props.currentPage == pgNumber ? "active" : ""
              } `}
            >
              <button
                onClick={() => props.setCurrentPage(pgNumber)}
                className="page-link"
               
              >
                {pgNumber}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button className="page-link" onClick={nextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
