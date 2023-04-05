import { useNavigate } from 'react-router-dom';

import ScrollToTop from './ScrollToTop';

function MovieError() {
  const navigate = useNavigate();

  const goBackToPrevPage = () => {
    navigate(-1);
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <main className="mv-error">
      <span className="mv-error__404">404 - Error</span>
      <h1 className="mv-error__title">There is nothing here</h1>
      <h2 className="mv-error__subtitle">
        Perhaps you were looking for something else
      </h2>

      <div className="mv-error__btn-container">
        <button
          type="button"
          className="mv-error__btn"
          onClick={goBackToPrevPage}
        >
          Go back
        </button>
        <button type="button" className="mv-error__btn" onClick={goToHome}>
          Homepage
        </button>
      </div>

      <ScrollToTop />
    </main>
  );
}
export default MovieError;
