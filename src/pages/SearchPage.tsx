import { Outlet } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';

function SearchPage() {
  return (
    <main className="search-page">
      <Outlet />
      <ScrollToTop />
    </main>
  );
}
export default SearchPage;
