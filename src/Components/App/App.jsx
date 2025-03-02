import { useEffect, useState } from 'react';

import Header from '../Header';
import FooterPagination from '../FooterPagination';
import MovieContainer from './../MovieContainer'
import useDebounce from './Debounce';
import MovieService from './../../Services';

import { Spin } from 'antd';
import { Alert } from 'antd';

import './App.css'

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [inputValue, setInputValue] = useState('')
  const [paginationState, setPaginationState] = useState(false)

  const movieService = new MovieService();

  let debouncedInputValue = useDebounce(inputValue, 500)

  useEffect(() => { fetchMovies(page, debouncedInputValue) }, [page, debouncedInputValue]);

  const fetchMovies = async (page, inputValue) => {
    try {
      if (inputValue) {
        setLoading(true)
      }
      const result = await movieService.getMovies(page, inputValue);

      if (result) {
        setMovies(result.results);
      }

      if (result.results.length !== 0) {
        setPaginationState(true)
      } else {
        setPaginationState(false)
      }
    }
    catch (Error) {
      onError()
    }
    finally {
      setLoading(false);
    }
  };

  const onError = () => {
    setError(true)
    setLoading(false)
  }

  const onChangePage = (page) => {
    setPage(page)
  }

  const onChangeInput = (e) => {
    setInputValue(e.target.value)
  }

  const hasDate = !(loading || error)

  const spinner = loading ? <Spin size="large" /> : null
  const errorMessage = error ? <Alert message="Server request error" type="error" /> : null

  const content = hasDate ?
    <>
      <MovieContainer movies={movies} />
      <FooterPagination page={page} paginationState={paginationState} onChangePage={onChangePage} />
    </> : null;

  return (
    <div className='App'>
      <Header onChangeInput={onChangeInput} />
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
}

export default App;
