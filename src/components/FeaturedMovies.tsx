import { useEffect, useState } from 'react';
import Flickity from 'react-flickity-component';

import { fetchMovies } from '../api/moviesApi';
import { Movie, MovieCategory } from '../types/types';
import MovieCard from './MovieCard';
import Loading from './Loading';

type CategoryInfo = {
  type: MovieCategory;
  title: string;
  subtitle?: string;
};

const categories: CategoryInfo[] = [
  {
    type: 'popular',
    title: 'Popular movies right now',
    subtitle: "Can't decide on a movie? Check these out to get started",
  },
  {
    type: 'top_rated',
    title: 'Top-rated movies of all time',
    subtitle: "Still can't decide? Here are some classics to check out",
  },
  {
    type: 'upcoming',
    title: 'Coming soon to theaters',
    subtitle: 'Here are some movies to watch for in the coming weeks',
  },
];

function FeaturedMovies(props: { category: MovieCategory }) {
  const { category } = props;

  const [categoryInfo, setCategoryInfo] = useState<CategoryInfo>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setCategoryInfo(categories.find((ctg) => ctg.type === category));

    fetchMovies(category)
      .then((data) => setMovies(data))
      .catch((err) => {
        if (err instanceof Error) {
          setError(true);
          setErrorMsg(err.message);
        }
      });
  }, []);

  const flickityOptions = {
    wrapAround: true,
    initialIndex: 1,
    groupCells: '70%',
  };

  return (
    <section className="rec-mv" aria-labelledby={`rec-mv__title-${category}`}>
      <h1 className="rec-mv__title" id={`rec-mv__title-${category}`}>
        {categoryInfo?.title}
      </h1>
      <p className="rec-mv__subtitle"> {categoryInfo?.subtitle}</p>

      {movies.length >= 1 ? (
        <Flickity
          elementType="section"
          className="rec-mv__movie-container"
          options={flickityOptions}
          reloadOnUpdate
        >
          {movies.map((mv) => (
            <MovieCard movie={mv} key={`${mv.id}--featured-${category}`} />
          ))}
        </Flickity>
      ) : (
        <Loading message="Fetching movie data..." />
      )}

      {isError && (
        <p className="rec-mv__error" role="alert" aria-label="movie data error">
          Something went wrong... {errorMsg}
        </p>
      )}
    </section>
  );
}
export default FeaturedMovies;
