import { useState } from 'react';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(() => e.target.value);
  };

  const submitSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setIsError(query.length < 1);

    const data = new FormData(e.currentTarget);
  };

  return (
    <form onSubmit={submitSearch} role="search" noValidate>
      <label htmlFor="search__input">
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
