import { it, expect, vi, afterEach } from 'vitest';

import axios from 'axios';
import { fetchMovies } from '../moviesApi';
import { Movie } from '../../types/types';

vi.mock('axios');
describe('Fetching movies', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    axios.get.mockResolvedValue({
      status: 200,
      data: {
        results: [
          {
            poster_path: '/1BdD1kMK1phbANQHmddADzoeKgr.jpg',
            adult: false,
            overview: 'Lorem ipsum',
            release_date: '2016-09-08',
            genre_ids: [36, 18],
            id: 363676,
            original_title: 'Sully',
            original_language: 'en',
            title: 'Sully',
            backdrop_path: '/nfj8iBvOjlb7ArbThO764HCQw5H.jpg',
            popularity: 3.254896,
            vote_count: 8,
            video: false,
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
