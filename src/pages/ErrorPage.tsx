import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  const goBackToPrevPage = () => {
    navigate(-1);
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <main className="error">
      <h1 className="error__title">404 - Error</h1>
      <h2 className="error__subtitle">There is nothing in here</h2>

      <div className="error__btn-container">
        <button type="button" className="error__btn" onClick={goBackToPrevPage}>
          Go back
        </button>
        <button type="button" className="error__btn" onClick={goToHome}>
          Homepage
        </button>
      </div>
    </main>
  );
}
export default ErrorPage;
