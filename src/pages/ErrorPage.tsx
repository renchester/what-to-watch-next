import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';

function ErrorPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = '404 Error - What to Watch Next';
  }, []);

  const goBackToPrevPage = () => {
    navigate(-1);
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <main className="error">
      <h3 className="error__404">404 - Error</h3>
      <h1 className="error__title">There is nothing here</h1>
      <h2 className="error__subtitle">
        Perhaps you were looking for something else
      </h2>

      <div className="error__btn-container">
        <button type="button" className="error__btn" onClick={goBackToPrevPage}>
          Go back
        </button>
        <button type="button" className="error__btn" onClick={goToHome}>
          Homepage
        </button>
      </div>
      <ScrollToTop />
    </main>
  );
}
export default ErrorPage;
