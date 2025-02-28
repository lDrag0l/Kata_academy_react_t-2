import { useEffect, useState } from 'react';
import MovieService from './../../Services/index';
import MovieContainer from './../MovieContainer'
import './App.css'
function App() {
  const [movies, setMovies] = useState([]);
  const movieService = new MovieService();

  const fetchMovies = async () => {
    const result = await movieService.getMovies();
    if (result) {
      setMovies(result.results);
    }
  };

  useEffect(() => { fetchMovies() }, []);

  return (
    <div className='App'>
      <input type="text" />
      <MovieContainer movies={movies} />
      <div>pag</div>
    </div>
  );
}

export default App;
