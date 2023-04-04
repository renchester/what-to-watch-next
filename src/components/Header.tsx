import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <h1>What to watch next</h1>
        <h2>A spanner in the works</h2>
      </Link>
      <SearchBar />
      <Link to="/watchlist" className="header__watchlist">
        <span className="material-symbols-outlined" aria-hidden="true">
          theaters
        </span>
        <span className="header__watchlist-text">Your watchlist</span>
      </Link>
    </header>
  );
}
export default Header;
