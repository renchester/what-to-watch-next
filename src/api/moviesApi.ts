import axios, { AxiosResponse } from 'axios';
import { Movie, MovieCategory } from '../types/types';

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
    `${API_URL}/${category}${endpoint}`,
  );
  const data = response.data as Data;

  if (!data || response.status !== 200) throw new Error('Unable to fetch data');

  return data.results;
};
