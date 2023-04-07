import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import MovieRecommendations from '../MovieRecommendations';

describe('The <MovieRecommendations> component', () => {
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
    const mockRecommendations = [
      {
        ...emptyMovie,
        title: 'Fake Movie 1',
      },
    ];

    render(
      <BrowserRouter>
        <MovieRecommendations
          recommendations={mockRecommendations}
          origMovieTitle="original movie"
        />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole('heading', {
        level: 2,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('If you liked original movie, you might also like...'),
    ).toBeInTheDocument();
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('does not render recommendations when an empty array is supplied', () => {
    render(
      <BrowserRouter>
        <MovieRecommendations
          recommendations={[]}
          origMovieTitle="original movie"
        />
      </BrowserRouter>,
    );

    expect(screen.getByRole('region')).toBeEmptyDOMElement();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
});
