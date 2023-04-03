import { Outlet } from 'react-router-dom';

function SearchPage() {
  return (
    <main className="search-page">
      <Outlet />
    </main>
  );
}
export default SearchPage;
