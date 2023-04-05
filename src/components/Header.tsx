import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import logo from '../assets/img/popcorn.png';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logo} alt="Popcorn logo" className="header__logo-icon" />
        <h1 className="header__logo-title">What to watch next</h1>
        <h2 className="header__logo-subtitle">Find your next movie to watch</h2>
      </Link>

      <SearchBar />

      <Link to="/watchlist" className="header__watchlist">
        <div
          className="header__watchlist-icon material-symbols-outlined"
          aria-hidden="true"
        >
          theaters
        </div>
        <span className="header__watchlist-text">Your watchlist</span>
      </Link>
    </header>
  );
}
export default Header;
