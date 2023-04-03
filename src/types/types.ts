export type MovieCategory = 'popular' | 'top_rated' | 'upcoming';

export type Movie = {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
};

export type MovieDetailsType = {
  adult?: boolean;
  backdrop_path?: string | null;
  belongs_to_collection?: null | {};
  budget?: number;
  genres?: { id: number; name: string }[];
  homepage?: string | null;
  id?: number;
  imdb_id?: string | null;
  original_language?: string;
  original_title?: string;
  overview?: string | null;
  popularity?: number;
  poster_path?: string | null;
  production_companies?: {
    name?: string;
    id?: number;
    logo_path?: string | null;
    origin_country?: string;
  }[];
  production_countries?: { iso_3166_1?: string; name?: string }[];
  release_date?: string;
  revenue?: number;
  runtime?: number | null;
  spoken_languages?: { iso_639_1?: string; name?: string }[];
  status?:
    | 'Rumored'
    | 'Planned'
    | 'In Production'
    | 'Post Production'
    | 'Released'
    | 'Canceled';
  tagline?: string | null;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
};

export type MovieCredits = {
  id?: number;
  cast?: MovieCast[];
  crew?: MovieCrew[];
};

export type MovieCast = {
  adult?: boolean;
  gender?: number | null;
  id?: number;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string | null;
  cast_id?: number;
  character?: string;
  credit_id?: string;
  order?: number;
};

export type MovieCrew = Omit<
  MovieCast & { department?: string; job?: string },
  'character' | 'order' | 'cast_id'
>;

export type PosterSizes =
  | 'w92'
  | 'w154'
  | 'w185'
  | 'w342'
  | 'w500'
  | 'w780'
  | 'original';

export type BackdropSizes = 'w300' | 'w780' | 'w1280' | 'original';

export type LogoSizes =
  | 'w45'
  | 'w92'
  | 'w154'
  | 'w185'
  | 'w300'
  | 'w500'
  | 'original';

export type ProfileSizes = 'w45' | 'w185' | 'h632' | 'original';
