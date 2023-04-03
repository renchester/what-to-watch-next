import { nanoid } from 'nanoid';
import { Suspense } from 'react';
import {
  LoaderFunctionArgs,
  useLoaderData,
  Await,
  defer,
} from 'react-router-dom';

import MovieCard from './MovieCard';
import Loading from './Loading';

import { fetchMovieQueryResults } from '../api/moviesApi';
import { Movie } from '../types/types';

export const searchLoader = ({ params }: LoaderFunctionArgs) => {
  const query = params.query as string;

  const resultsPromise = fetchMovieQueryResults(query);
  return defer({ resultsPromise });
};

function SearchResults() {
  const { resultsPromise } = useLoaderData() as { resultsPromise: Movie[] };

  return (
    <section className="results" aria-labelledby="results__title">
      <h1 className="results__title" id="results__title">
        Results for ...
      </h1>

      <section className="results-container">
        <Suspense fallback={<Loading message="Fetching search results..." />}>
          <Await resolve={resultsPromise}>
            {(searchResults: Movie[]) =>
              searchResults.map((res) => (
                <MovieCard movie={res} key={nanoid()} />
              ))
            }
          </Await>
        </Suspense>
      </section>
    </section>
  );
}
export default SearchResults;
