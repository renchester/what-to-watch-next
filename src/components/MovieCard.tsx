import { Link } from 'react-router-dom';
import getYear from 'date-fns/getYear';

import { Movie, PosterSizes } from '../types/types';

type MovieCardProps = {
  movie: Movie;
};

function MovieCard(props: MovieCardProps) {
  const { movie } = props;
  const IMG_URL = import.meta.env.VITE_TMDB_IMG_URL;
  const IMG_SIZE_IDENTIFIER: PosterSizes = 'w342';

  return (
    <Link to={`/movie/${movie.id}`}>
      <article className="mv-card" aria-label="movie card">
        {movie.poster_path && (
          <img
            src={`${IMG_URL}/${IMG_SIZE_IDENTIFIER}${movie.poster_path}`}
            alt={`Poster for ${movie.title || 'this movie'}`}
            className="mv-card__img"
          />
        )}
        <h3 className="mv-card__title" aria-label="movie title">
          {movie.title}
        </h3>
        {movie.release_date && (
          <h4 className="mv-card__year" aria-label="movie release year">
            {getYear(new Date(movie.release_date))}
          </h4>
        )}
        {movie.overview && (
          <p
            className="mv-card__overview"
            aria-label={`Plot overview for ${movie.title || 'this movie'}`}
            data-testid="mv-card__overview"
          >
            {movie.overview}
          </p>
        )}
      </article>
    </Link>
  );
}
export default MovieCard;
