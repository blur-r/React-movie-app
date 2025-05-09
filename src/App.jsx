import "./css/App.css";
import Favorites from "./pages/favorites";
import Home from "./pages/home";
import Shows from "./pages/shows";
import MovieDetails from "./pages/movie_details";
import ShowDetails from "./pages/show_details";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import NavBar from "./components/NavBar";

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/show/:id" element={<ShowDetails />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;