import WatchlistSection from '../components/WatchlistSection';
import { useWatchlist } from '../context/WatchlistContext';

function WatchlistPage() {
  const { watchlistState } = useWatchlist();

  const renderPlaceholder = () => (
    <h2>You have nothing in your watchlist yet...</h2>
  );

  return (
    <main className="wl-page">
      {watchlistState.length >= 1 ? (
        <WatchlistSection list={watchlistState} />
      ) : (
        renderPlaceholder()
      )}
    </main>
  );
}
export default WatchlistPage;
