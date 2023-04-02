import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, Mocked } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import FeaturedMovies from '../FeaturedMovies';

vi.mock('axios');
const mockedAxios = axios as Mocked<typeof axios>;

describe('The <FeaturedMovies> component', () => {
  it('renders correct header based on category - popular', () => {
    render(
      <BrowserRouter>
        <FeaturedMovies category="popular" />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole('heading', { name: /popular/i }),
    ).toBeInTheDocument();
  });

  it('renders correct header based on category - upcoming', () => {
    render(
      <BrowserRouter>
        <FeaturedMovies category="upcoming" />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole('heading', { name: /coming soon/i }),
    ).toBeInTheDocument();
  });

  it('renders movies when API call succeeds', async () => {
    const fakeMovies = [
      {
        title: 'Fake Movie 1',
        overview: 'Fake Overview 1',
        release_date: '2010-11-10',
      },
      {
        title: 'Fake Movie 2',
        overview: 'Fake Overview 2',
        release_date: '2012-11-10',
      },
    ];

    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: {
        results: fakeMovies,
      },
    });

    render(
      <BrowserRouter>
        <FeaturedMovies category="popular" />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getAllByRole('heading', { name: 'movie title', level: 3 }),
      ).toHaveLength(2);

      expect(
        screen.getAllByRole('heading', { name: 'movie release year' }),
      ).toHaveLength(2);

      expect(screen.getByText(/fake movie 1/i)).toBeInTheDocument();

      expect(screen.getByText(/fake overview 1/i)).toBeInTheDocument();
    });
  });

  it('renders error message when API call fails', async () => {
    mockedAxios.get.mockResolvedValue({
      status: 404,
    });

    render(
      <BrowserRouter>
        <FeaturedMovies category="popular" />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByRole('alert', { name: 'movie data error' }),
      ).toBeInTheDocument();
    });
  });
});
