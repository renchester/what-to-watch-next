import { useNavigate } from 'react-router-dom';

type EmptySearchProps = {
  query?: string;
};

function EmptySearch(props: EmptySearchProps) {
  const { query } = props;
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <>
      <h1 className="empty-res__title">
        Your search {query && `for ${query}`} does not match anything in our
        database
      </h1>
      <h2 className="empty-res__subtitle">Try searching for something else</h2>

      <button type="button" className="empty-res__btn" onClick={goToHome}>
        Go back to homepage
      </button>
    </>
  );
}
export default EmptySearch;
