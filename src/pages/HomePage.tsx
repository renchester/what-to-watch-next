import { useEffect } from 'react';
import FeaturedMovies from '../components/FeaturedMovies';
import ScrollToTop from '../components/ScrollToTop';

function HomePage() {
  useEffect(() => {
    document.title = 'Home - What to Watch Next';
  }, []);

  return (
    <main className="home-page">
      <FeaturedMovies category="popular" />
      <FeaturedMovies category="upcoming" />
      <FeaturedMovies category="top_rated" />
      <ScrollToTop />
    </main>
  );
}
export default HomePage;
