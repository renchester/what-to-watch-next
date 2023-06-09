import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type SearchBarProps = {
  hideNav: () => void;
};

function SearchBar(props: SearchBarProps) {
  const { hideNav } = props;

  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const submitSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const isEmpty = query.length < 1;

    setIsError(isEmpty);
    if (isEmpty) return;

    const newQuery = new FormData(e.currentTarget).get('search') as string;

    navigate(`/search/${newQuery.trim()}`);
    hideNav();
  };

  useEffect(() => {
    setTimeout(() => setIsError(false), 5000);
  }, [isError]);

  return (
    <form className="search" onSubmit={submitSearch} role="search" noValidate>
      <label htmlFor="search__input" className="search__input--wrapper">
        <span className="search__label">Search for a movie</span>
        <input
          id="search__input"
          type="search"
          className="search__input"
          name="search"
          value={query}
          placeholder="What's a movie on your mind?"
          onChange={handleSearchChange}
          minLength={1}
          required
        />
        {isError && (
          <p
            className="search__error-message"
            role="alert"
            aria-label="search input error"
          >
            You need to enter a search term before pressing submit.
          </p>
        )}
      </label>
      <button type="submit" className="search__btn" aria-label="search button">
        <span className="material-symbols-outlined" aria-hidden="true">
          search
        </span>
      </button>
    </form>
  );
}
export default SearchBar;
