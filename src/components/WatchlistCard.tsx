import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchMovieDetails } from '../api/moviesApi';
import { useWatchlist } from '../context/WatchlistContext';
import { PosterSizes, MovieDetailsType } from '../types/types';

type WatchlistCardProps = {
  movieId: number;
};

function WatchlistCard(props: WatchlistCardProps) {
  const { movieId } = props;
  const { dispatch } = useWatchlist();

  const [movie, setMovie] = useState<MovieDetailsType>({
    id: 0,
  });

  useEffect(() => {
    const getMovie = async () => {
      try {
        const data = await fetchMovieDetails(movieId.toString());
        setMovie(data);
      } catch (err) {
        // eslint-disable-next-line no-console
        if (err instanceof Error) console.error(err.message);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getMovie();

    return () => {
      setMovie({ id: 0 });
    };
  }, []);

  const IMG_URL = import.meta.env.VITE_TMDB_IMG_URL;
  const IMG_SIZE_IDENTIFIER: PosterSizes = 'w342';
  const imageSource = movie.poster_path
    ? `${IMG_URL}/${IMG_SIZE_IDENTIFIER}/${movie.poster_path}`
    : '';

  const removeFromWatchList = () => {
    dispatch({ type: 'remove_from_list', payload: movieId });
  };

  return (
    <article
      className="wl-card"
      aria-label={`Card for ${movie.title || 'this movie in your watchlist'}`}
    >
      <Link to={`/movie/${movieId}`} className="wl-card__link">
        <img
          src={imageSource}
          alt={`Poster for ${movie.title || 'this movie'}`}
        />
        {movie.title && <h2 className="wl-card__title">{movie.title}</h2>}
        {movie.overview && (
          <p className="wl-card__overview">{movie.overview}</p>
        )}
      </Link>
      <button
        type="button"
        className="wl-card__remove-btn"
        onClick={removeFromWatchList}
        aria-label="Remove from watchlist"
      >
        Delete
      </button>
    </article>
  );
}
export default WatchlistCard;
