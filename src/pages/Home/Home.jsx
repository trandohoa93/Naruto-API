import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchListPokemon } from "../../features/search/searchSlice";
import SearchForm from "../../components/App/SearchFrom";
import PokemonList from "../../components/App/PokemonList";
import Pagination from "../../components/App/Pagination";

function Home() {
  const loading = useSelector((state) => state.search.loading);
  const filteredPokemons = useSelector(
    (state) => state.search.filteredPokemons
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchListPokemon());
  }, [dispatch]);
  // Pagination
  const itemsPerPage = 6;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredPokemons.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredPokemons.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredPokemons.length;
    setItemOffset(newOffset);
  };
  return (
    <div className="container mx-auto mt-10">
      <SearchForm />
      <PokemonList loading={loading} filteredPokemons={currentItems} />
      <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
    </div>
  );
}

export default Home;
