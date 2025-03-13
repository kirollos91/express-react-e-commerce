import ReactPaginate from "react-paginate";
import "./Pagination.css";

export default function PaginatedItems({ itemsPerPage, page, dataLength }) {
  const pageCount =
    dataLength / itemsPerPage <= 1 ? 0 : Math.ceil(dataLength / itemsPerPage);

  return (
    <>
      <ReactPaginate
        previousLabel="<<"
        breakLabel="..."
        nextLabel=">>"
        onPageChange={(e) => {
          page(e.selected + 1);
        }}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName="custom-pagination d-flex align-items-center justify-content-end m-0"
        pageLinkClassName="pagination-tag-anchor text-secondary mx-2 rounded-circle"
        activeLinkClassName="bg-primary text-white"
      />
    </>
  );
}
