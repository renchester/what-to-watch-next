import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <Link to="/" className="header__logo">
        <h1>What to watch next</h1>
        <h2>A spanner in the works</h2>
      </Link>
    </div>
  );
}
export default Header;
