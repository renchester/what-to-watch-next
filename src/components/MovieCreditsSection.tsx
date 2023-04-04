import { nanoid } from 'nanoid';
import { MovieCredits } from '../types/types';
import CastProfile from './CastProfile';

type MovieCreditsProps = {
  credits: MovieCredits;
};

function MovieCreditsSection(props: MovieCreditsProps) {
  const { credits } = props;

  const movieCast = credits.cast?.slice(0, 12) || [];
  const movieCrew =
    credits.crew?.filter(
      (person) =>
        person.job?.match(/director/i) || person.job?.match(/producer/i),
    ) || [];

  return (
    <section className="mv-credits" aria-label="Movie credits">
      {movieCast.length > 0 && (
        <article
          className="mv-credits__cast"
          aria-labelledby="mv-credits__cast-title"
        >
          <h2 id="mv-credits__cast-title" className="mv-credits__title">
            Cast Members
          </h2>

          <ul className="mv-credits__list">
            {movieCast.map((castMember) => (
              <CastProfile
                type="cast"
                profile={castMember}
                key={castMember.cast_id || nanoid()}
              />
            ))}
          </ul>
        </article>
      )}

      {movieCrew.length > 0 && (
        <article
          className="mv-credits__crew"
          aria-labelledby="mv-credits__crew-title"
        >
          <h2 id="mv-credits__crew-title" className="mv-credits__title">
            Behind the camera
          </h2>

          <ul className="mv-credits__list">
            {movieCrew.map((crewMember) => (
              <CastProfile
                type="crew"
                profile={crewMember}
                key={crewMember.credit_id || nanoid()}
              />
            ))}
          </ul>
        </article>
      )}
    </section>
  );
}

export default MovieCreditsSection;
