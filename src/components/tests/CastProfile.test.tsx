import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import CastProfile from '../CastProfile';

describe('The <CastProfile> component', () => {
  it('renders elements correctly', () => {
    const mockProfile = {
      name: 'John Doe',
      character: 'William',
      profile_path: '/sample.jpg',
    };

    render(
      <BrowserRouter>
        <CastProfile type="cast" profile={mockProfile} />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole('listitem', { name: /cast profile/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'John Doe', level: 4 }),
    ).toBeInTheDocument();
    expect(screen.getByText('William')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('does not render image when image path is not available', () => {
    const mockProfile = {
      name: 'John Doe',
      character: 'William',
      profile_path: '',
    };

    render(
      <BrowserRouter>
        <CastProfile type="cast" profile={mockProfile} />
      </BrowserRouter>,
    );

    expect(
      screen.queryByRole('img', { name: /profile for john doe/i }),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole('img', { name: /empty profile/i }),
    ).toBeInTheDocument();
  });
});
