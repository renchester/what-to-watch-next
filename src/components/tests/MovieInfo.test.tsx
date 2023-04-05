import { render } from '@testing-library/react';
import { describe, it, beforeEach, vi, Mocked } from 'vitest';
import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
  defer,
} from 'react-router-dom';

import axios from 'axios';

import MovieInfo from '../MovieInfo';
import { MovieCredits, MovieDetailsType } from '../../types/types';

vi.mock('axios');
const mockedAxios = axios as Mocked<typeof axios>;

describe('The <MovieDetails> component', () => {
  beforeEach(() => {
    const mockMovieDetails: MovieDetailsType = {
      adult: false,
      backdrop_path: '/123.jpg',
      genres: [
        { id: 1, name: 'drama' },
        { id: 2, name: 'fantasy' },
      ],
      id: 123,
      original_title: 'Fake Fantasy Movie',
      original_language: 'en',
      overview:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, qui sunt.',
      popularity: 5,
      poster_path: null,
      release_date: '2010-09-07',
      runtime: 150,
      tagline: 'Lorem ipsum',
      vote_average: 8,
      vote_count: 3000,
    };

    const mockCredits: MovieCredits = {
      id: 321,
      cast: [
        {
          adult: true,
          gender: 0,
          id: 1214,
          name: 'John Doe',
          original_name: 'John Doe',
          popularity: 10,
          profile_path: '',
          cast_id: 1224,
          character: 'Batman',
          credit_id: '1213414',
          order: 2,
        },
      ],
      crew: [
        {
          adult: true,
          gender: 0,
          id: 123244,
          name: 'Miranda Apple',
          original_name: 'Miranda Apple',
          popularity: 10,
          profile_path: '',
          credit_id: '1252354',
          job: 'Director',
          department: 'Artistry',
        },
      ],
    };

    const mockLoader = () => {
      const movieDetailsPromise = mockedAxios.get.mockResolvedValue({
        status: 200,
        data: mockMovieDetails,
      });

      const movieCastPromise = mockedAxios.get.mockResolvedValue({
        status: 200,
        data: mockCredits,
      });

      return defer({
        movieDetailsPromise,
        movieCastPromise,
      });
    };

    const testRoute = createBrowserRouter(
      createRoutesFromChildren(
        <Route path="/123" loader={mockLoader} element={<MovieInfo />} />,
      ),
    );

    render(<RouterProvider router={testRoute} />);
  });

  it('renders elements correctly', () => {});
});
