import Header from '../Header';
import FooterPagination from '../Pagination';
import MovieService from './../../Services';
import MovieContainer from './../MovieContainer'
import './App.css'

import { useEffect, useState } from 'react';


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

  if (movies.length === 0) return <div>Loading!!!</div>

  return (
    <div className='App'>
      <Header />
      <MovieContainer movies={movies} />
      <FooterPagination />
    </div>
  );
}

export default App;
