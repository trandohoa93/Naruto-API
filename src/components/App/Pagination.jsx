/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import PokemonList from "./PokemonList";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Pagination = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pageParams, setPageParams] = useState(
    new URLSearchParams(location.search)
  );

  // Loading
  const loading = useSelector((state) => state.search.loading);
  let filteredPokemons = useSelector((state) => state.search.filteredPokemons);
  const ListPokemons = useSelector((state) => state.search.ListPokemons);

  const searchTerm = useSelector((state) => state.search.searchTerm);
  filteredPokemons = ListPokemons.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Search

  // Pagination
  const itemsPerPage = 6;
  const [itemOffset, setItemOffset] = useState(0);
  const [page, setPage] = useState(pageParams.get("page") || 0);

  //
  const endOffset = page * itemsPerPage + itemsPerPage;
  const currentItems = filteredPokemons.slice(itemOffset, endOffset);
  console.log(itemOffset, page);
  const pageCount = Math.ceil(filteredPokemons.length / itemsPerPage);
  const handlePageClick = (event) => {
    // Update searchParams with new value
    pageParams.set("page", event.selected);
    navigate(`?${pageParams.toString()}`);

    const newOffset = (event.selected * itemsPerPage) % filteredPokemons.length;
    setItemOffset(newOffset);
    setPage(event.selected);
  };
  useEffect(() => {
    setPageParams(new URLSearchParams(location.search));
    setItemOffset(0);
    pageParams.set("page", 0);
    setPage(0);
  }, [searchTerm]);
  return (
    <>
      <PokemonList loading={loading} filteredPokemons={currentItems} />
      <div className="max-w-xl mx-auto">
        <ReactPaginate
          breakLabel="..."
          forcePage={page}
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
    </>
  );
};
export default Pagination;
