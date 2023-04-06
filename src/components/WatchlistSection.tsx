import { Suspense } from 'react';
import { nanoid } from 'nanoid';
import { Watchlist } from '../types/types';
import WatchlistCard from './WatchlistCard';
import Loading from './Loading';

type WatchlistSectionProps = {
  list: Watchlist;
};

function WatchlistSection(props: WatchlistSectionProps) {
  const { list } = props;

  return (
    <section className="wl-section" aria-label={`Watchlist section`}>
      <h1 className="wl-section__title" aria-label="watchlist title">
        Your watchlist
      </h1>
      <h2 className="wl-section__subtitle">All your movies in one place</h2>

      <ul className="wl-section__list">
        <Suspense fallback={<Loading message="Fetching watchlist details" />}>
          {list.length >= 1 &&
            list.map((id) => <WatchlistCard movieId={id} key={nanoid()} />)}
        </Suspense>
      </ul>
    </section>
  );
}
export default WatchlistSection;
