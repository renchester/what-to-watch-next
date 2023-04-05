import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import './sass/main.scss';

import App from './App';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import MoviePage from './pages/MoviePage';
import ErrorPage from './pages/ErrorPage';

import EmptySearch from './components/EmptySearch';
import SearchResults, { searchLoader } from './components/SearchResults';
import MovieInfo, { movieInfoLoader } from './components/MovieInfo';
import WatchlistPage from './pages/WatchlistPage';
import MovieError from './components/MovieError';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="search" element={<SearchPage />}>
        <Route index element={<EmptySearch />} />
        <Route
          path=":query"
          loader={searchLoader}
          element={<SearchResults />}
          errorElement={<MovieError />}
        />
      </Route>
      <Route path="movie" element={<MoviePage />}>
        <Route
          path=":movieId"
          loader={movieInfoLoader}
          element={<MovieInfo />}
          errorElement={<MovieError />}
        />
      </Route>
      <Route path="watchlist" element={<WatchlistPage />}></Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
