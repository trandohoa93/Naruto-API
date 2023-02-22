import SearchForm from "../../components/App/SearchFrom";
import PokemonList from "../../components/App/PokemonList";

function Home() {
  return (
    <div className="container mx-auto mt-10">
      <SearchForm />
      <PokemonList />
    </div>
  );
}

export default Home;
