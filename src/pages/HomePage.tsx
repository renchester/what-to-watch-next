import { useState } from 'react';

import SearchBar from '../components/SearchBar';

function HomePage() {
  return (
    <main>
      <SearchBar />

      <section className="rec-mv" aria-labelledby="rec-mv__title">
        <h1 className="rec-mv__title" id="rec-mv__title">
          Popular Movies right now
        </h1>
        <p className="rec-mv__subtitle">
          Can&apos;t decide on a movie? Check these out for a starter
        </p>
      </section>
    </main>
  );
}
export default HomePage;
