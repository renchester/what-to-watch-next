import FeaturedMovies from '../components/FeaturedMovies';

function HomePage() {
  return (
    <main className="home-page">
      <FeaturedMovies category="popular" />
      <FeaturedMovies category="upcoming" />
      <FeaturedMovies category="top_rated" />
    </main>
  );
}
export default HomePage;
