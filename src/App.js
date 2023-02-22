import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Layouts/Navbar";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import SinglePokemon from "./pages/SinglePokemon/SinglePokemon";
import Error from "./pages/Error/Error";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cocktail/:id" element={<SinglePokemon />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
