import { nanoid } from 'nanoid';
import { Movie } from '../types/types';
import MovieCard from './MovieCard';

type MovieRecommendationsProps = {
  recommendations: Movie[];
  origMovieTitle: string;
};

function MovieRecommendations(props: MovieRecommendationsProps) {
  const { recommendations, origMovieTitle } = props;

  return (
    <section className="mv-rec" aria-labelledby="mv-rec__title">
      {recommendations.length >= 1 && (
        <>
          <h2 className="mv-rec__title" id="mv-rec__title">
            If you liked {origMovieTitle}, you might also like...
          </h2>
          <div className="mv-rec__recommendations">
            {recommendations.map((rec) => (
              <MovieCard movie={rec} key={nanoid()} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
export default MovieRecommendations;
