import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({
  itemsPerPage,
  setCurrentPage,
  totalPages,
  currentPage,
}) => {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  //   const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  //   const endOffset = itemOffset + itemsPerPage;
  //   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  //   const currentItems = items.slice(itemOffset, endOffset);
  //   const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    // const newOffset = (event.selected * itemsPerPage) % items.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`,
    // );
    setCurrentPage((item) => {
      return { ...item, currentPage: event.selected };
    });
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border">
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={itemsPerPage}
        pageCount={totalPages}
        previousLabel={
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border">
            <FontAwesomeIcon icon={faAngleLeft} />
          </div>
        }
        forcePage={currentPage}
        renderOnZeroPageCount={null}
        className="pagination"
      />
    </>
  );
};

export default Pagination;
