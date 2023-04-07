import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import Header from '../Header';

describe('The <Header> component', () => {
  it('renders the logo correctly', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole('heading', { name: /what to watch next/i }),
    ).toBeInTheDocument();
  });

  it('renders the searchbar', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('renders the watchlist icon', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole('link', { name: /your watchlist/i }),
    ).toBeInTheDocument();
  });
});
