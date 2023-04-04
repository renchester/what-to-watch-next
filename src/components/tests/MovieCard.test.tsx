import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import MovieCard from '../MovieCard';

describe('The <MovieCard> component', () => {
  const emptyMovie = {
    adult: false,
    backdrop_path: '',
    genre_ids: [],
    id: 1,
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 1,
    poster_path: '',
    release_date: '',
    title: '',
    video: false,
    vote_average: 1,
    vote_count: 1,
  };

  it('renders elements correctly', () => {
    const mockMovie = {
      ...emptyMovie,
      title: 'Fake Movie',
      overview: 'Fake Overview',
      release_date: '2010-10-11',
    };

    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole('heading', { name: /movie title/i }),
    ).toHaveTextContent('Fake Movie');

    expect(
      screen.getByRole('heading', { name: /movie release year/i }),
    ).toHaveTextContent('2010');

    expect(screen.getByText('Fake Overview')).toBeInTheDocument();
  });

  it('renders images when path is successful', () => {
    const mockMovie = {
      ...emptyMovie,
      poster_path: '/fNTtVbqI92abEKAgz2ynurCUne.jpg',
    };

    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>,
    );

    expect(screen.getByAltText(/poster for this movie/i)).toBeInTheDocument();
  });

  it('does not render image when path is not supplied', () => {
    const mockMovie = {
      ...emptyMovie,
    };

    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>,
    );

    expect(
      screen.queryByAltText(/poster for this movie/i),
    ).not.toBeInTheDocument();
  });

  it('does not render overview when not supplied', () => {
    render(
      <BrowserRouter>
        <MovieCard movie={emptyMovie} />
      </BrowserRouter>,
    );

    expect(screen.queryByTestId('mv-card__overview')).not.toBeInTheDocument();
  });

  it('does not render release year when not supplied', () => {
    render(
      <BrowserRouter>
        <MovieCard movie={emptyMovie} />
      </BrowserRouter>,
    );

    expect(
      screen.queryByRole('heading', { name: 'movie release year' }),
    ).not.toBeInTheDocument();
  });
});
