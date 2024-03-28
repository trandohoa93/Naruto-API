import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListPokemon } from "../../features/search/searchSlice";
import SearchForm from "../../components/App/SearchFrom";
import Pagination from "../../components/App/Pagination";
import SelectForm from "../../components/App/SelectForm";
import Loading from "../../components/App/Loading";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchListPokemon());
  }, []);

  const loading = useSelector((state) => state.search.loading);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto">
      <div className="pt-10 pr-10 pf-10">
        <SearchForm />
        <SelectForm />
      </div>
      <Pagination />
    </div>
  );
}

export default Home;
