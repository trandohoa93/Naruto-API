/* eslint-disable react/prop-types */
import ReactPaginate from "react-paginate";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
const Pagination = ({ handlePageClick, pageCount }) => {
  return (
    <div className="max-w-xl mx-auto">
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <li>
            <span className="sr-only">Previous</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </li>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel={
          <li>
            <span className="sr-only">Next</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </li>
        }
        renderOnZeroPageCount={null}
        containerClassName="flex items-center justify-center -space-x-px"
        previousClassName="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        nextClassName="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        pageClassName="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        breakClassName="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
        activeClassName="z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
      />
    </div>
  );
};
export default Pagination;
