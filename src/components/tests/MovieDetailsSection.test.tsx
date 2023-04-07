import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import { WatchlistProvider } from '../../context/WatchlistContext';
import MovieDetailsSection from '../MovieDetailsSection';
import { MovieDetailsType } from '../../types/types';

const emptyMovieDetails: MovieDetailsType = {
  adult: false,
  backdrop_path: '',
  belongs_to_collection: null,
  budget: 0,
  genres: [],
  homepage: null,
  id: 1,
  imdb_id: null,
  original_language: '',
  original_title: '',
  overview: '',
  popularity: 1,
  poster_path: '',
  production_companies: [
    {
      name: '',
      id: 0,
      logo_path: null,
      origin_country: 'United Kingdom',
    },
  ],
  release_date: '',
  revenue: 0,
  runtime: 0,
  spoken_languages: [],
  status: 'Released',
  tagline: '',
  title: '',
  video: false,
  vote_average: 0,
  vote_count: 0,
};

describe('The <MovieDetailsSection> component ', () => {
  it('renders correctly', () => {
    const mockMovie = {
      ...emptyMovieDetails,
      title: 'Fake movie 1',
      release_date: '2009-10-11',
      vote_average: 9.666,
      runtime: 160,
      tagline: 'Fake tagline',
      overview: 'Fake overview',
      backdrop_path: '/fake-backdrop.jpg',
      genres: [
        { id: 0, name: 'drama' },
        { id: 1, name: 'fantasy' },
      ],
    };

    render(
      <BrowserRouter>
        <WatchlistProvider>
          <MovieDetailsSection movie={mockMovie} />
        </WatchlistProvider>
      </BrowserRouter>,
    );

    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: /movie title/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /movie release year and rating/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: /movie tagline/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/fake overview/i)).toBeInTheDocument();

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText(/fantasy/i)).toBeInTheDocument();
    expect(screen.getByText(/drama/i)).toBeInTheDocument();

    expect(screen.getByAltText(/backdrop image/i)).toBeInTheDocument();
  });

  it('does not render elements when data is not supplied', () => {
    render(
      <BrowserRouter>
        <WatchlistProvider>
          <MovieDetailsSection movie={emptyMovieDetails} />
        </WatchlistProvider>
      </BrowserRouter>,
    );

    expect(screen.queryByRole('region')).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { level: 1, name: /movie title/i }),
    ).toBeEmptyDOMElement();
    expect(
      screen.queryByRole('heading', {
        name: /movie release year and rating/i,
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: /movie tagline/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/fake overview/i)).not.toBeInTheDocument();

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    expect(screen.queryByAltText(/backdrop image/i)).not.toBeInTheDocument();
  });
});

describe('The other info section', () => {
  it('renders elements when supplied data', () => {
    const mockMovieDetails = {
      ...emptyMovieDetails,
      runtime: 200,
      budget: 300,
      revenue: 500,
      release_date: '2010-09-09',
      spoken_languages: [{ name: 'English' }, { name: 'Francais' }],
      homepage: 'https://hello-hello-hello.org',
    };

    render(
      <BrowserRouter>
        <WatchlistProvider>
          <MovieDetailsSection movie={mockMovieDetails} />
        </WatchlistProvider>
      </BrowserRouter>,
    );

    expect(
      screen.getByRole('heading', { level: 4, name: /runtime/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('200 min')).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { level: 4, name: /budget/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('$300.00')).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { level: 4, name: /revenue/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('$500.00')).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { level: 4, name: /release date/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('September 09 2010')).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { level: 4, name: /languages/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('English Francais')).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { level: 4, name: /Website/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('https://hello-hello-hello.org'),
    ).toBeInTheDocument();
  });

  it('does not render elements when data is not supplied', () => {
    render(
      <BrowserRouter>
        <WatchlistProvider>
          <MovieDetailsSection movie={emptyMovieDetails} />
        </WatchlistProvider>
      </BrowserRouter>,
    );

    expect(
      screen.queryByRole('heading', { level: 4, name: /runtime/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('200 min')).not.toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { level: 4, name: /budget/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('$300.00')).not.toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { level: 4, name: /revenue/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('$500.00')).not.toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { level: 4, name: /release date/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('September 09 2010')).not.toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { level: 4, name: /languages/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('English Francais')).not.toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { level: 4, name: /Website/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('https://hello-hello-hello.org'),
    ).not.toBeInTheDocument();
  });
});

describe('The watchlist button in MovieDetailsSection', () => {
  it('renders correct textContent to display inWatchlist status', async () => {
    render(
      <BrowserRouter>
        <WatchlistProvider>
          <MovieDetailsSection movie={emptyMovieDetails} />
        </WatchlistProvider>
      </BrowserRouter>,
    );

    const user = userEvent.setup();

    const buttonAdd = screen.getByRole('button', {
      name: /add to your watchlist/i,
    });

    expect(buttonAdd).toBeInTheDocument();

    await user.click(buttonAdd);

    await waitFor(() => {
      expect(
        screen.queryByRole('button', {
          name: /remove from watchlist/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('button', {
          name: /add to your watchlist/i,
        }),
      ).not.toBeInTheDocument();
    });
  });
});
