import { Suspense, useEffect } from 'react';
import {
  LoaderFunctionArgs,
  useLoaderData,
  Await,
  defer,
  useParams,
} from 'react-router-dom';

import MovieCard from './MovieCard';
import Loading from './Loading';

import { fetchMovieQueryResults } from '../api/moviesApi';
import { Movie } from '../types/types';
import EmptySearch from './EmptySearch';

export const searchLoader = ({ params }: LoaderFunctionArgs) => {
  const query = params.query as string;

  const resultsPromise = fetchMovieQueryResults(query);
  return defer({ resultsPromise });
};

function SearchResults() {
  const { query } = useParams();
  const { resultsPromise } = useLoaderData() as { resultsPromise: Movie[] };

  useEffect(() => {
    const title = query ? `for ${query}` : '';

    document.title = `Search results ${title} - What to Watch Next`;
  }, [query]);

  const renderResults = (searchResults: Movie[]) => (
    <>
      <h1 className="search-results__title" id="search-results__title">
        Results for {query}
      </h1>
      <div className="search-results__container">
        {searchResults.map((res, index) => (
          <MovieCard movie={res} key={`${res.id}--search-result-${index}`} />
        ))}
      </div>
    </>
  );

  return (
    <section className="search-results" aria-labelledby="search-results__title">
      <Suspense fallback={<Loading message="Fetching search results..." />}>
        <Await resolve={resultsPromise} errorElement={<p>Nothing here</p>}>
          {(searchResults: Movie[]) => {
            return searchResults.length >= 1 ? (
              renderResults(searchResults)
            ) : (
              <EmptySearch query={query} />
            );
          }}
        </Await>
      </Suspense>
    </section>
  );
}
export default SearchResults;
