import { useEffect } from 'react';
import EmptyWatchlist from '../components/EmptyWatchlist';
import WatchlistSection from '../components/WatchlistSection';
import ScrollToTop from '../components/ScrollToTop';

import { useWatchlist } from '../context/WatchlistContext';

function WatchlistPage() {
  const { watchlistState } = useWatchlist();

  useEffect(() => {
    document.title = 'Your Watchlist - What to Watch Next';
  }, []);

  return (
    <main className="wl-page">
      {watchlistState.length >= 1 ? (
        <WatchlistSection list={watchlistState} />
      ) : (
        <EmptyWatchlist />
      )}
      <ScrollToTop />
    </main>
  );
}
export default WatchlistPage;
