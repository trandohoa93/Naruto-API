/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import PokemonList from "./PokemonList";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const itemsPerPage = 6;
const Pagination = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Loading
  const ListPokemons = useSelector((state) => state.search.filteredPokemons);
  const searchTerm = useSelector((state) => state.search.searchTerm);

  const pageParams = new URLSearchParams(location.search);

  const [page, setPage] = useState(pageParams.get("page") || 0);
  const [itemOffset, setItemOffset] = useState(page * itemsPerPage);
  const [firstLoading, setFirstLoading] = useState(true);

  const ItemPokemon = ListPokemons.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //
  const endOffset = page * itemsPerPage + itemsPerPage;
  const currentItems = ItemPokemon.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(ItemPokemon.length / itemsPerPage);

  const handlePageClick = (event) => {
    pageParams.set("page", event.selected);
    navigate(`?${pageParams.toString()}`);

    const newOffset = (event.selected * itemsPerPage) % ItemPokemon.length;

    setItemOffset(newOffset);
    setPage(event.selected);
  };
  useEffect(() => {
    if (!firstLoading) {
      setPage(0);
      setItemOffset(0);
    }
    pageParams.set("input", searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    setFirstLoading(false);
  }, []);
  return (
    <>
      <PokemonList filteredPokemons={currentItems} />
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
