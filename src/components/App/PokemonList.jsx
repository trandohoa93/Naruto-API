import Loading from "./Loading";
import { useSelector, useDispatch } from "react-redux";
import { fetchListPokemon } from "../../features/search/searchSlice";
import { useEffect } from "react";
import PokemonCard from "./PokemonCard";

function PokemonList() {
  const loading = useSelector((state) => state.search.loading);
  const filteredPokemons = useSelector(
    (state) => state.search.filteredPokemons
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchListPokemon());
  }, [dispatch]);
  if (loading) {
    return <Loading />;
  }
  if (!filteredPokemons) {
    return <h2>no cocktails matched your search criteria</h2>;
  }
  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      {filteredPokemons.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}

export default PokemonList;
