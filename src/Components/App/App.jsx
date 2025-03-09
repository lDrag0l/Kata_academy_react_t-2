import { useEffect, useState } from 'react';

import Header from '../Header';
import FooterPagination from '../FooterPagination';
import MovieContainer from './../MovieContainer';
import useDebounce from './../../Utils/MovieUtils';
import MovieService from './../../Services';
import RatedMovies from '../RatedMovies';

import { Alert, Spin } from 'antd';

import './App.css';

import { useGenres } from '../../Contexts/genresContext';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [isPaginationVisible, setPaginationStateVisible] = useState(false);
  const [tabState, setTabState] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { setGenres } = useGenres();
  const [ratedMovies, setRatedMovies] = useState([]);
  const movieService = new MovieService();
  let debouncedInputValue = useDebounce(inputValue, 500);

  useEffect(() => {
    const getRatedMovies = async () => {
      const guestSessionId = localStorage.getItem('guest_session_id');

      if (!guestSessionId) {
        return;
      }

      setLoading(true);
      setError(false);

      let allRatedMovies = [];
      let currentPage = 1;

      try {
        let totalPages = 1;
        do {
          const response = await movieService.getRatedMovies(currentPage);

          if (response.success && response.data) {
            allRatedMovies = [...allRatedMovies, ...response.data.results];
            totalPages = response.data.total_pages;
          } else {
            setError(true);
            break;
          }

          currentPage += 1;
        } while (currentPage <= totalPages);

        setRatedMovies(allRatedMovies);
      }

      catch (error) {
        setError(true);
        console.log(error);
      }

      finally {
        setLoading(false);
      }
    };

    getRatedMovies();
  }, []);


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
      console.log(error)
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

    if (key === 0) {
      const updatedMovies = updateMoviesWithRatings(movies, ratedMovies);
      setMovies(updatedMovies);
    }
  };

  const onChangeResult = (result) => {
    const updatedMovies = updateMoviesWithRatings(result.results, ratedMovies);
    setMovies(updatedMovies);

    setTotalPages(result.total_results)
    setPaginationStateVisible(result.results.length !== 0);
  }

  const updateMoviesWithRatings = (movies, ratedMovies) => {
    const ratedMovieMap = new Map(ratedMovies.map(movie => [movie.id, movie.rating]));

    return movies.map(movie => {
      const rating = ratedMovieMap.get(movie.id);
      return rating !== undefined ? {
        ...movie,
        movieClickedRate: rating,
      } : movie;
    });
  };

  const hasData = !(loading || error);
  const spinner = loading ? <Spin size="large" /> : null;
  const errorMessage = error ? <Alert message="Server request error" type="error" /> : null;

  const renderContent = () => {
    if (tabState === 0) {
      return (
        <>
          <MovieContainer movies={movies} />
          <FooterPagination totalPages={totalPages} page={page} isPaginationVisible={isPaginationVisible} onChangePage={onChangePage} />
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
