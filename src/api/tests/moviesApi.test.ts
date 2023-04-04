import { it, expect, vi, afterEach, Mocked } from 'vitest';

import axios from 'axios';
import {
  fetchMovies,
  fetchMovieQueryResults,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieRecommendations,
} from '../moviesApi';
import { Movie } from '../../types/types';

vi.mock('axios');
const mockedAxios = axios as Mocked<typeof axios>;

describe('Fetching movies', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: {
        results: [
          {
            id: 363676,
            title: 'Sully',
            vote_average: 4.88,
          },
        ],
      },
    });
  });

  it('returns the title correctly', async () => {
    const mockFetch = vi.fn().mockImplementation(fetchMovies);

    const movies = (await mockFetch('popular')) as Movie[];

    expect(movies[0].title).toEqual('Sully');
  });

  it('gets called with the right category', async () => {
    const mockFetch = vi.fn().mockImplementation(fetchMovies);

    await mockFetch('popular');

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith('popular');
  });
});

describe('Fetching movie search results', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: {
        results: [
          {
            overview: 'Lorem ipsum',
            id: 363676,
            title: 'Fake result 1',
            vote_average: 4.88,
          },
          {
            overview: 'Lorem ipsum',
            id: 363676,
            title: 'Fake result 2',
            vote_average: 4.88,
          },
        ],
      },
    });
  });

  it('returns the correct amount of search results', async () => {
    const mockFetch = vi.fn().mockImplementation(fetchMovieQueryResults);

    const movies = (await mockFetch('fake')) as Movie[];

    expect(movies).toHaveLength(2);
    expect(movies[0].title).toMatch(/fake/i);
  });

  it('gets called with the right parameter', async () => {
    const mockFetch = vi.fn().mockImplementation(fetchMovieQueryResults);

    await mockFetch('fake');

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith('fake');
  });
});

describe('Error handling', () => {
  beforeEach(() =>
    mockedAxios.get.mockResolvedValue({
      status: 404,
    }),
  );

  it('returns correct error message for fetching movies', async () => {
    let target;

    try {
      target = await fetchMovies('popular');
    } catch (err) {
      if (err instanceof Error)
        expect(err.message).toMatch(/unable to fetch data/i);
    }

    expect(target).toBeUndefined();
  });

  it('returns correct error message for fetching movie search results', async () => {
    let target;

    try {
      target = await fetchMovieQueryResults('mock');
    } catch (err) {
      if (err instanceof Error)
        expect(err.message).toMatch(/unable to fetch search results/i);
    }

    expect(target).toBeUndefined();
  });

  it('returns correct error message for fetching movie details', async () => {
    let target;

    try {
      target = await fetchMovieDetails('123');
    } catch (err) {
      if (err instanceof Error)
        expect(err.message).toMatch(/unable to fetch movie details/i);
    }

    expect(target).toBeUndefined();
  });

  it('returns correct error message for fetching movie recommendations', async () => {
    let target;

    try {
      target = await fetchMovieRecommendations('123');
    } catch (err) {
      if (err instanceof Error)
        expect(err.message).toMatch(/unable to fetch movie recommendations/i);
    }

    expect(target).toBeUndefined();
  });

  it('returns correct error message for fetching movie cast', async () => {
    let target;

    try {
      target = await fetchMovieCast('123');
    } catch (err) {
      if (err instanceof Error)
        expect(err.message).toMatch(/unable to fetch movie credits/i);
    }

    expect(target).toBeUndefined();
  });
});
