import axios, { AxiosResponse } from 'axios';
import {
  Movie,
  MovieCategory,
  MovieDetailsType,
  MovieCredits,
} from '../types/types';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_URL = import.meta.env.VITE_TMDB_API_URL;

const endpoint = `?api_key=${API_KEY}`;

type Data = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export const fetchMovies = async (category: MovieCategory) => {
  const response: AxiosResponse = await axios.get(
    `${API_URL}/movie/${category}${endpoint}`,
  );
  const data = response.data as Data;

  if (!data || response.status !== 200) throw new Error('Unable to fetch data');

  return data.results;
};

export const fetchMovieQueryResults = async (query: string) => {
  const response: AxiosResponse = await axios.get(
    `${API_URL}/search/movie${endpoint}&query=${query}&include_adult=false`,
  );
  const data = response.data as Data;

  if (!data || response.status !== 200)
    throw new Error('Unable to fetch search results');

  return data.results;
};

export const fetchMovieDetails = async (id: string) => {
  const response: AxiosResponse = await axios.get(
    `${API_URL}/movie/${id}${endpoint}`,
  );
  const data = response.data as MovieDetailsType;

  if (!data || response.status !== 200)
    throw new Error('Unable to fetch movie details');

  return data;
};

export const fetchMovieRecommendations = async (id: string) => {
  const response: AxiosResponse = await axios.get(
    `${API_URL}/movie/${id}/recommendations${endpoint}`,
  );
  const data = response.data as Data;

  if (!data || response.status !== 200)
    throw new Error('Unable to fetch movie recommendations');

  return data.results;
};

export const fetchMovieCast = async (id: string) => {
  const response: AxiosResponse = await axios.get(
    `${API_URL}/movie/${id}/credits${endpoint}`,
  );

  const data = response.data as MovieCredits;

  if (!data || response.status !== 200)
    throw new Error('Unable to fetch movie credits');

  return data;
};
