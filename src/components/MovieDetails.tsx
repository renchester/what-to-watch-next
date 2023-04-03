import { ReactElement, Suspense } from 'react';
import {
  LoaderFunctionArgs,
  useLoaderData,
  Await,
  defer,
} from 'react-router-dom';
import getYear from 'date-fns/getYear';
import { nanoid } from 'nanoid';

import Loading from './Loading';
import CastProfile from './CastProfile';

import { fetchMovieDetails, fetchMovieCast } from '../api/moviesApi';
import { BackdropSizes, MovieCredits, MovieDetailsType } from '../types/types';

export const movieDetailsLoader = ({ params }: LoaderFunctionArgs) => {
  const movieId = params.movieId as string;

  const movieDetailsPromise = fetchMovieDetails(movieId);
  const movieCastPromise = fetchMovieCast(movieId);
  return defer({ movieDetailsPromise, movieCastPromise });
};

function MovieDetails() {
  const { movieDetailsPromise, movieCastPromise } = useLoaderData() as {
    movieDetailsPromise: MovieDetailsType;
    movieCastPromise: MovieCredits;
  };

  const IMG_URL = import.meta.env.VITE_TMDB_IMG_URL;
  const IMG_SIZE_IDENTIFIER: BackdropSizes = 'w1280';

  const renderMovieDetails = (movie: MovieDetailsType): ReactElement => {
    return (
      <section
        className="mv-dtl"
        aria-label={`Details section for ${
          movie.title || 'your selected movie'
        }`}
      >
        <h1 className="mv-dtl__title" aria-label="movie title">
          {movie.title}
        </h1>
        <h2 className="mv-dtl__release-year" aria-label="movie release year">
          {getYear(new Date(movie.release_date || 1))}
        </h2>
        {movie?.vote_average ? (
          <h2 className="mv-dtl__rating" aria-label="movie rating">
            {movie.vote_average}/10
          </h2>
        ) : (
          ''
        )}

        {movie.tagline && (
          <h3 className="mv-dtl__tagline" aria-label="movie tagline">
            {movie.tagline}
          </h3>
        )}

        <p className="mv-dtl__overview" aria-label="movie overview">
          {movie.overview}
        </p>

        {movie.genres && (
          <ul className="mv-dtl__genre--wrapper">
            {movie.genres?.length >= 1 &&
              movie.genres?.map((mv) => (
                <li className="mv-dtl__genre" key={mv.id}>
                  {mv.name}
                </li>
              ))}
          </ul>
        )}

        {movie.backdrop_path && (
          <img
            src={`${IMG_URL}/${IMG_SIZE_IDENTIFIER}${movie.backdrop_path}`}
            alt={`Official poster for ${movie.title || 'this movie'}`}
          />
        )}
      </section>
    );
  };

  const renderMovieCast = (cast: MovieCredits): ReactElement => {
    const movieCast = cast.cast?.slice(0, 12) || [];
    const movieCrew =
      cast.crew?.filter(
        (person) =>
          person.job?.match(/director/i) || person.job?.match(/producer/i),
      ) || [];

    return (
      <section className="mv-credits">
        {movieCast.length > 0 && (
          <article className="mv-credits__cast">
            <h2 className="mv-credits__cast-title">Cast Members</h2>

            {movieCast.map((castMember) => (
              <CastProfile
                type="cast"
                profile={castMember}
                key={castMember.cast_id || nanoid()}
              />
            ))}
          </article>
        )}

        {movieCrew.length > 0 && (
          <article className="mv-credits__crew">
            <h2 className="mv-credits__crew-title">Behind the camera</h2>

            {movieCrew.map((crewMember) => (
              <CastProfile
                type="crew"
                profile={crewMember}
                key={crewMember.credit_id || nanoid()}
              />
            ))}
          </article>
        )}
      </section>
    );
  };

  return (
    <Suspense fallback={<Loading message="Loading Movie Details" />}>
      <Await resolve={movieDetailsPromise}>
        {(movie: MovieDetailsType) => renderMovieDetails(movie)}
      </Await>
      <Await resolve={movieCastPromise}>
        {(cast: MovieCredits) => renderMovieCast(cast)}
      </Await>
    </Suspense>
  );
}
export default MovieDetails;
