import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import MovieCreditsSection from '../MovieCreditsSection';

describe('The <MovieCreditsSection> component', () => {
  const emptyCredits = {
    id: 0,
    cast: [],
    crew: [],
  };

  it('renders elements correctly', () => {
    const mockCredits = {
      ...emptyCredits,
      cast: [{ name: 'John Doe', character: 'William' }],
      crew: [{ name: 'Anna Winter', job: 'Director' }],
    };

    render(
      <BrowserRouter>
        <MovieCreditsSection credits={mockCredits} />
      </BrowserRouter>,
    );

    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /cast members/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /behind the camera/i }),
    ).toBeInTheDocument();

    expect(screen.getAllByRole('list')).toHaveLength(2);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('does not render cast members when data is not supplied', () => {
    render(
      <BrowserRouter>
        <MovieCreditsSection credits={emptyCredits} />
      </BrowserRouter>,
    );

    expect(
      screen.queryByRole('heading', { name: /cast members/i }),
    ).not.toBeInTheDocument();
  });

  it('does not render crew members when data is not supplied', () => {
    render(
      <BrowserRouter>
        <MovieCreditsSection credits={emptyCredits} />
      </BrowserRouter>,
    );

    expect(
      screen.queryByRole('heading', { name: /behind the camera/i }),
    ).not.toBeInTheDocument();
  });
});
