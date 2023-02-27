import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchListPokemon } from "../../features/search/searchSlice";
import SearchForm from "../../components/App/SearchFrom";
import Pagination from "../../components/App/Pagination";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchListPokemon());
  }, []);
  return (
    <div className="container mx-auto mt-10">
      <SearchForm />
      <Pagination />
    </div>
  );
}

export default Home;
