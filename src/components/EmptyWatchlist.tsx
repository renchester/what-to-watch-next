import { useNavigate } from 'react-router-dom';

function EmptyWatchlist() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <>
      <h1 className="empty-wl__title">You have nothing in your watchlist</h1>
      <h2 className="empty-wl__subtitle">Add one now!</h2>

      <button type="button" className="empty-wl__btn" onClick={goToHome}>
        Go back to homepage
      </button>
    </>
  );
}
export default EmptyWatchlist;
