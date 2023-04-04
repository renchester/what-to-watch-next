import { Outlet } from 'react-router-dom';

import { WatchlistProvider } from './context/WatchlistContext';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <WatchlistProvider>
      <Header />
      <Outlet />
      <Footer />
    </WatchlistProvider>
  );
}
export default App;
