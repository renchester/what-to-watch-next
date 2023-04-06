import githubIcon from '../assets/img/github-icon.png';
import tmdbIcon from '../assets/img/tmdb-logo.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <ul className="footer-main__links">
          <li className="footer-main__link">About</li>
          <li className="footer-main__link">News</li>
          <li className="footer-main__link">Help</li>
          <li className="footer-main__link">Terms</li>
          <li className="footer-main__link">Contact</li>
        </ul>
      </div>
      <div className="footer-attribution">
        <span className="footer-attribution__text">
          All film-related metadata used in What-to-watch-next, including actor,
          director, studio names, synopses, release dates, and poster art is
          supplied by{' '}
          <a
            href="http://themoviedb.org/"
            rel="noopener noreferrer"
            target="_blank"
          >
            {' '}
            The Movie Database{' '}
          </a>
        </span>
        <a
          href="http://themoviedb.org/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            src={tmdbIcon}
            alt="Logo for the Movie Database"
            className="footer__tmdb-logo"
          />
        </a>
      </div>

      <div className="footer-github">
        <a
          href="https://github.com/renchester"
          target="_blank"
          className="footer__link"
          rel="noopener noreferrer"
        >
          <img
            src={githubIcon}
            alt="Github icon"
            width="25"
            className="footer__img"
          />
          <p className="footer__desc">Developed by Renchester Ramos</p>
        </a>
        <small className="footer__copyright">
          &copy; Copyright {new Date().getFullYear()} Renchester Ramos. All
          rights reserved.{' '}
        </small>
      </div>
    </footer>
  );
}

export default Footer;
