import { Outlet } from 'react-router-dom';

function MoviePage() {
  return (
    <main className="mv-page">
      <Outlet />
    </main>
  );
}
export default MoviePage;
