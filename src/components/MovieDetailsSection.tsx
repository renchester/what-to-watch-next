import { useEffect, useState } from 'react';
import getYear from 'date-fns/getYear';

import { MovieDetailsType, BackdropSizes } from '../types/types';
import { useWatchlist } from '../context/WatchlistContext';

type MovieDetailsSectionProps = {
  movie: MovieDetailsType;
};

function MovieDetailsSection(props: MovieDetailsSectionProps) {
  const { movie } = props;
  const [inWatchlist, setInWatchlist] = useState(false);
  const { watchlistState, dispatch } = useWatchlist();

  const IMG_URL = import.meta.env.VITE_TMDB_IMG_URL;
  const IMG_SIZE_IDENTIFIER: BackdropSizes = 'w1280';

  useEffect(() => {
    if (watchlistState.find((wlMovieId) => wlMovieId === movie.id))
      setInWatchlist(true);
  }, []);

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
      <h1 className="mv-dtl__title" aria-label="movie title">
        {movie.title}
      </h1>
      {movie.release_date && (
        <h2 className="mv-dtl__release-year" aria-label="movie release year">
          {getYear(new Date(movie.release_date))}
        </h2>
      )}

      {!!movie.vote_average && (
        <h3 className="mv-dtl__rating" aria-label="movie rating">
          {movie.vote_average}/10
        </h3>
      )}

      {!!movie.runtime && (
        <h3 className="mv-dtl__runtime" aria-label="movie runtime">
          {movie.runtime} min
        </h3>
      )}

      {movie.tagline && (
        <h2 className="mv-dtl__tagline" aria-label="movie tagline">
          {movie.tagline}
        </h2>
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
          alt={`Backdrop image for ${movie.title || 'this movie'}`}
          className="mv-dtl__img"
        />
      )}

      <div className="mv-dtl__wl-container">
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
    </section>
  );
}
export default MovieDetailsSection;
