import { Suspense, useEffect, useState } from 'react';
import {
  LoaderFunctionArgs,
  useLoaderData,
  Await,
  defer,
  useParams,
} from 'react-router-dom';

import Loading from './Loading';

import {
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieRecommendations,
} from '../api/moviesApi';
import { MovieCredits, MovieDetailsType, Movie } from '../types/types';
import MovieRecommendations from './MovieRecommendations';
import MovieCreditsSection from './MovieCreditsSection';
import MovieDetailsSection from './MovieDetailsSection';
import ScrollToTop from './ScrollToTop';

export const movieInfoLoader = async ({ params }: LoaderFunctionArgs) => {
  const movieId = params.movieId as string;

  const movieDetails = await fetchMovieDetails(movieId);
  const movieCastPromise = fetchMovieCast(movieId);
  const movieRecsPromise = fetchMovieRecommendations(movieId);
  return defer({ movieDetails, movieCastPromise, movieRecsPromise });
};

function MovieInfo() {
  const { movieDetails, movieCastPromise, movieRecsPromise } =
    useLoaderData() as {
      movieDetails: MovieDetailsType;
      movieCastPromise: MovieCredits;
      movieRecsPromise: Movie[];
    };

  const { movieId } = useParams();
  const [targetMovie, setTargetMovie] = useState<MovieDetailsType>({ id: 0 });

  useEffect(() => {
    setTargetMovie(() => movieDetails);
  }, [movieId]);

  useEffect(() => {
    document.title = `${
      targetMovie.title || 'Movie Page'
    } - What to Watch Next`;
  }, [targetMovie]);

  return (
    <>
      <MovieDetailsSection movie={targetMovie} />

      <Suspense fallback={<Loading message="Loading Movie Credits" />}>
        <Await resolve={movieCastPromise}>
          {(credits: MovieCredits) => <MovieCreditsSection credits={credits} />}
        </Await>
      </Suspense>
      <Suspense fallback={<Loading message="Loading Recommendations" />}>
        <Await resolve={movieRecsPromise}>
          {(recs: Movie[]) => (
            <MovieRecommendations
              recommendations={recs}
              origMovieTitle={targetMovie.title || ''}
            />
          )}
        </Await>
      </Suspense>

      <ScrollToTop />
    </>
  );
}
export default MovieInfo;
