import { MovieCast, MovieCrew, ProfileSizes } from '../types/types';
import placeholder from '../assets/img/placeholder-profile.png';

type CastProfileProps = {
  type: 'cast' | 'crew';
  profile: Partial<MovieCast & MovieCrew>;
};

function CastProfile(props: CastProfileProps) {
  const { type, profile } = props;

  const IMG_URL = import.meta.env.VITE_TMDB_IMG_URL;
  const IMG_SIZE_IDENTIFIER: ProfileSizes = 'w185';

  return (
    <li className="cast-prof" aria-label={`${type} profile`}>
      {profile.profile_path ? (
        <img
          src={`${IMG_URL}/${IMG_SIZE_IDENTIFIER}${profile.profile_path}`}
          alt={`Profile for ${profile.name || 'a cast/crew member'}`}
          className="cast-prof__img"
        />
      ) : (
        <img src={placeholder} alt="Empty profile" className="cast-prof__img" />
      )}

      <h4 className="cast-prof__name">{profile.name}</h4>
      <span
        className="cast-prof__character"
        aria-label={type === 'cast' ? 'character name' : 'job description'}
      >
        {type === 'cast' ? profile.character : profile.job}
      </span>
    </li>
  );
}
export default CastProfile;
