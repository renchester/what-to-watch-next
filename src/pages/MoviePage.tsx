import { Outlet } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';

function MoviePage() {
  return (
    <main className="mv-page">
      <Outlet />
      <ScrollToTop />
    </main>
  );
}
export default MoviePage;
