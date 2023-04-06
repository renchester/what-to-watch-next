import EmptyWatchlist from '../components/EmptyWatchlist';
import WatchlistSection from '../components/WatchlistSection';
import { useWatchlist } from '../context/WatchlistContext';

function WatchlistPage() {
  const { watchlistState } = useWatchlist();

  return (
    <main className="wl-page">
      {watchlistState.length >= 1 ? (
        <WatchlistSection list={watchlistState} />
      ) : (
        <EmptyWatchlist />
      )}
    </main>
  );
}
export default WatchlistPage;
