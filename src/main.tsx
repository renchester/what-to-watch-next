import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './sass/main.scss';

import App from './App';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';

import EmptySearch from './components/EmptySearch';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />}>
            <Route index element={<EmptySearch />} />
            <Route path=":query" element={<EmptySearch />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
