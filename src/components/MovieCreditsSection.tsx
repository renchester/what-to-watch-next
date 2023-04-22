import Flickity from 'react-flickity-component';

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

  const flickityOptions = {
    groupCells: '30%',
    initialIndex: 0,
    cellAlign: 'left',
    contain: true,
  };

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

          <Flickity
            className="mv-credits__list"
            elementType="ul"
            options={flickityOptions}
          >
            {movieCast.map((castMember, index) => (
              <CastProfile
                type="cast"
                profile={castMember}
                key={`${castMember.cast_id || index}--cast-profile-${index}-${
                  castMember.credit_id || ''
                }`}
              />
            ))}
          </Flickity>
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

          <Flickity
            className="mv-credits__list"
            elementType="ul"
            options={flickityOptions}
          >
            {movieCrew.map((crewMember, index) => (
              <CastProfile
                type="crew"
                profile={crewMember}
                key={`${crewMember.credit_id || index}--cast-profile-${index}-${
                  crewMember.job || ''
                }`}
              />
            ))}
          </Flickity>
        </article>
      )}
    </section>
  );
}

export default MovieCreditsSection;
