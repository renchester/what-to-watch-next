import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import SearchBar from './SearchBar';
import logo from '../assets/img/popcorn.png';

function Header() {
  const [isNavShown, setNavShown] = useState(false);

  const toggleNav = () => setNavShown(() => !isNavShown);
  const hideNav = () => setNavShown(false);

  const hideableContent = (
    <>
      <SearchBar hideNav={hideNav} />
      <Link to="/watchlist" className="header__watchlist" onClick={hideNav}>
        <div
          className="header__watchlist-icon material-symbols-outlined"
          aria-hidden="true"
        >
          theaters
        </div>
        <span className="header__watchlist-text">Your watchlist</span>
      </Link>
    </>
  );

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logo} alt="Popcorn logo" className="header__logo-icon" />
        <h1 className="header__logo-title">What to watch next</h1>
        <h2 className="header__logo-subtitle">Find your next movie to watch</h2>
      </Link>

      <div className="header__hideable">{hideableContent}</div>

      <button
        type="button"
        className="header__btn-menu"
        aria-label="Open menu for search and watchlist"
        onClick={toggleNav}
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      <AnimatePresence>
        {isNavShown && (
          <motion.nav
            className="header__hideable--small"
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ type: 'tween' }}
          >
            {hideableContent}
            <button
              type="button"
              className="header__btn-close-menu"
              onClick={hideNav}
            >
              <span className="material-symbols-outlined">expand_less</span>
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
export default Header;
