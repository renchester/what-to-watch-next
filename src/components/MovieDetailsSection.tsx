import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format, getYear } from 'date-fns';

import { MovieDetailsType, BackdropSizes, PosterSizes } from '../types/types';
import { useWatchlist } from '../context/WatchlistContext';
import convertToUSD from '../utils/convertToUSD';

import placeholder from '../assets/img/placeholder-portrait.png';
import placeholderLandscape from '../assets/img/placeholder-landscape.webp';

type MovieDetailsSectionProps = {
  movie: MovieDetailsType;
};

function MovieDetailsSection(props: MovieDetailsSectionProps) {
  const { movie } = props;
  const { movieId } = useParams();

  const [inWatchlist, setInWatchlist] = useState(false);
  const { watchlistState, dispatch } = useWatchlist();

  const IMG_URL = import.meta.env.VITE_TMDB_IMG_URL;
  const IMG_SIZE_IDENTIFIER: BackdropSizes = 'w1280';

  const POSTER_SIZE_IDENTIFIER: PosterSizes = 'w780';

  useEffect(() => {
    if (movieId && watchlistState.includes(parseInt(movieId))) {
      setInWatchlist(true);
    } else {
      setInWatchlist(false);
    }
  }, [movieId]);

  const addToWatchList = () => {
    dispatch({
      type: 'add_to_list',
      payload: movie.id,
    });

    setInWatchlist(true);
  };

  const removeFromWatchList = () => {
    dispatch({ type: 'remove_from_list', payload: movie.id });

    setInWatchlist(false);
  };

  return (
    <section
      className="mv-dtl"
      aria-label={`Details section for ${movie.title || 'your selected movie'}`}
    >
      <div className="mv-dtl__main">
        {movie.backdrop_path ? (
          <img
            src={`${IMG_URL}/${IMG_SIZE_IDENTIFIER}${movie.backdrop_path}`}
            alt={`Backdrop image for ${movie.title || 'this movie'}`}
            className="mv-dtl__img"
          />
        ) : (
          <img
            src={placeholderLandscape}
            alt="Placeholder backdrop"
            className="mv-dtl__img"
          />
        )}
        <div className="mv-dtl__wl-container">
          <h1 className="mv-dtl__title" aria-label="movie title">
            {movie.title}
          </h1>

          {movie.release_date && (
            <h2 className="mv-dtl__year" aria-label="release year">
              {getYear(new Date(movie.release_date))}
            </h2>
          )}

          {movie.tagline && (
            <h2 className="mv-dtl__tagline" aria-label="movie tagline">
              {movie.tagline}
            </h2>
          )}

          {inWatchlist ? (
            <button
              type="button"
              className="mv-dtl__wl-btn remove"
              onClick={removeFromWatchList}
            >
              {' '}
              Remove from watchlist
            </button>
          ) : (
            <button
              type="button"
              className="mv-dtl__wl-btn add"
              onClick={addToWatchList}
            >
              {' '}
              Add to your watchlist{' '}
            </button>
          )}
        </div>
      </div>

      <div className="mv-dtl__dtls-container">
        {movie.poster_path ? (
          <img
            className="mv-dtl__poster"
            loading="lazy"
            src={`${IMG_URL}/${POSTER_SIZE_IDENTIFIER}/${movie.poster_path}`}
            alt={`Poster for ${movie.title || 'this movie'}`}
          />
        ) : (
          <img
            src={placeholder}
            alt="Poster placeholder"
            className="mv-dtl__poster"
          />
        )}

        <article
          className="mv-dtl__overview--wrapper"
          aria-labelledby="mv-dtl__overview-title"
        >
          <h2 className="mv-dtl__overview-title" id="mv-dtl__overview-title">
            Overview
          </h2>
          <p className="mv-dtl__overview" aria-label="movie overview">
            {movie.overview}
          </p>

          {movie.genres && movie.genres?.length >= 1 && (
            <>
              <h2 className="mv-dtl__genre-title">Genres</h2>
              <ul className="mv-dtl__genre--wrapper">
                {movie.genres?.length >= 1 &&
                  movie.genres?.map((mv) => (
                    <li className="mv-dtl__genre" key={mv.id}>
                      {mv.name}
                    </li>
                  ))}
              </ul>
            </>
          )}
        </article>

        <article className="mv-dtl__info--container" aria-labelledby="">
          <h2 className="mv-dtl__info-title">Other Info</h2>

          {movie.runtime && (
            <div className="mv-dtl__info--wrapper">
              <h4 className="mv-dtl__info-label">Runtime:</h4>
              <span className="mv-dtl__info-text">{movie.runtime} min</span>
            </div>
          )}

          {!!movie.budget && (
            <div className="mv-dtl__info--wrapper">
              <h4 className="mv-dtl__info-label">Budget:</h4>
              <span className="mv-dtl__info-text">
                {convertToUSD(movie.budget)}
              </span>
            </div>
          )}

          {!!movie.revenue && (
            <div className="mv-dtl__info--wrapper">
              <h4 className="mv-dtl__info-label">Revenue:</h4>
              <span className="mv-dtl__info-text">
                {convertToUSD(movie.revenue)}
              </span>
            </div>
          )}

          {movie.release_date && (
            <div className="mv-dtl__info--wrapper">
              <h4 className="mv-dtl__info-label">Release Date:</h4>
              <span className="mv-dtl__info-text">
                {format(new Date(movie.release_date), 'MMMM dd yyyy')}
              </span>
            </div>
          )}

          {movie.spoken_languages && movie.spoken_languages?.length >= 1 && (
            <div className="mv-dtl__info--wrapper">
              <h4 className="mv-dtl__info-label">Languages:</h4>
              <span className="mv-dtl__info-text">
                {movie.spoken_languages.map((lang) => lang.name).join(' ')}
              </span>
            </div>
          )}

          {movie.homepage && (
            <div className="mv-dtl__info--wrapper">
              <h4 className="mv-dtl__info-label">Website:</h4>
              <a
                href={movie.homepage}
                className="mv-dtl__info-text"
                target="_blank"
                rel="noopener noreferrer"
              >
                {movie.homepage}
              </a>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
export default MovieDetailsSection;
