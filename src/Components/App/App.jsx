import { useEffect, useState } from 'react';

import Header from '../Header';
import FooterPagination from '../FooterPagination';
import MovieContainer from './../MovieContainer'

import MovieService from './../../Services';

import { Spin } from 'antd';
import { Alert } from 'antd';

import './App.css'

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)


  const movieService = new MovieService();

  useEffect(() => { fetchMovies(page) }, [page]);

  const fetchMovies = async (page) => {
    try {
      const result = await movieService.getMovies(page);
      if (result) {
        setMovies(result.results);
        setLoading(false)
      }
    }
    catch (Error) {
      onError(Error)
    }
  };

  const onError = () => {
    setError(true)
    setLoading(false)
  }

  const onChangePage = (page) => {
    setPage(page)
  }

  const hasDate = !(loading || error)

  const spinner = loading ? <Spin size="large" /> : null
  const errorMessage = error ? <Alert message="Server request error" type="error" /> : null

  const content = hasDate ?
    <>
      <MovieContainer movies={movies} />
      <FooterPagination onChangePage={onChangePage} />
    </> : null;

  return (
    <div className='App'>
      <Header />
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
}

export default App;
