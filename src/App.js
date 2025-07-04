import logo from "./logo.svg";
import "./App.css";
import "./styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MoviesGrid from "./components/MoviesGrid";
import Watchlist from "./components/Watchlist";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchList] = useState([]);

  useEffect(() => {
    fetch("movies.json")
      .then(response => response.json())
      .then(data => setMovies(data));
  }, []);

  const toggleWatchlist = movieId => {
    setWatchList(prev =>
      prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  return (
    <div className="App">
      <div class="container">
        <Header></Header>

        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/watchlist">Watchlist</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <MoviesGrid
                  movies={movies}
                  watchlist={watchlist}
                  toggleWatchlist={toggleWatchlist}
                />
              }></Route>
            <Route
              path="/watchlist"
              element={
                <Watchlist
                  movies={movies}
                  watchlist={watchlist}
                  toggleWatchlist={toggleWatchlist}
                />
              }></Route>
          </Routes>
        </Router>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default App;
