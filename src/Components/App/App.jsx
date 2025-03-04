import { useEffect, useState } from 'react';

import Header from '../Header';
import FooterPagination from '../FooterPagination';
import MovieContainer from './../MovieContainer';
import useDebounce from './Debounce';
import MovieService from './../../Services';
import RatedMovies from '../RatedMovies';

import { Spin } from 'antd';
import { Alert } from 'antd';

import './App.css';

import { useGenres } from '../../Contexts/genresContext';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [paginationState, setPaginationState] = useState(false);
  const [tabState, setTabState] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { setGenres } = useGenres();
  const movieService = new MovieService();
  let debouncedInputValue = useDebounce(inputValue, 500);

  useEffect(() => {
    fetchMovies(page, debouncedInputValue);
  }, [page, debouncedInputValue]);

  useEffect(() => {
    createGuestSession()
  }, []);

  useEffect(() => {
    getGenres()
  }, []);

  const getGenres = async () => {
    try {
      const response = await movieService.getGenres()

      if (response) {
        setGenres(response.genres)
      }

    }
    catch (error) {

    }
  }

  const createGuestSession = async () => {
    const sessionIdKey = 'guest_session_id';
    const sessionTimeKey = 'guest_session_time';
    const sessionDuration = 12 * 60 * 60 * 1000; //12 h

    const currentTime = new Date().getTime();
    const sessionTime = localStorage.getItem(sessionTimeKey);

    if (!localStorage.getItem(sessionIdKey) || (sessionTime && (currentTime - sessionTime > sessionDuration))) {
      try {
        console.log('Try create new session')

        const response = await movieService.guestSession();

        console.log('New session done!')
        if (response) {
          localStorage.setItem(sessionIdKey, response.guest_session_id);
          localStorage.setItem(sessionTimeKey, currentTime);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchMovies = async (page, inputValue) => {
    setLoading(true);
    setError(false)

    try {
      const result = await movieService.getMovies(page, inputValue);

      if (result) {
        onChangeResult(result)
      }

      if (inputValue && result.results.length === 0) setError(true)

    }

    catch (Error) {
      onError();
    }

    finally {
      setLoading(false);
    }
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const onChangePage = (page) => {
    setPage(page);
  };

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const onChangeTab = (key) => {
    setTabState(key);
  };

  const onChangeResult = (result) => {
    setMovies(result.results);
    setTotalPages(result.total_pages)
    setPaginationState(result.results.length !== 0);
  }

  const hasData = !(loading || error);
  const spinner = loading ? <Spin size="large" /> : null;
  const errorMessage = error ? <Alert message="Server request error" type="error" /> : null;

  const renderContent = () => {
    if (tabState === 0) {
      return (
        <>
          <MovieContainer movies={movies} />
          <FooterPagination totalPages={totalPages} page={page} paginationState={paginationState} onChangePage={onChangePage} />
        </>
      );
    } else if (tabState === 1) {
      return <RatedMovies />;
    }
    return null;
  };

  return (
    <div className='App'>
      <Header inputValue={inputValue} tabState={tabState} onChangeInput={onChangeInput} onChangeTab={onChangeTab} />
      {errorMessage}
      {spinner}
      {hasData && renderContent()}
    </div>
  );
}

export default App;
