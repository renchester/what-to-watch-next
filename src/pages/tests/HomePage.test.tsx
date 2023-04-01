import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import HomePage from '../HomePage';

describe('The search bar', () => {
  it('should be empty initially', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
    );

    const searchBar = screen.getByRole('searchbox');
    expect(searchBar).toBeInTheDocument();
  });

  it('should update value on user input', async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
    );

    const user = userEvent.setup();
    const searchBar: HTMLInputElement = screen.getByRole('searchbox');

    await user.type(searchBar, 'hello');

    expect(searchBar?.value).toEqual('hello');
  });

  it('does not submit query when empty', async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
    );

    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'search button' });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    await user.click(button);

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('displays error message when empty', async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
    );

    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'search button' });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    await user.click(button);

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('submits query when provided an input', async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
    );

    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'search button' });
    const searchBar = screen.getByRole('searchbox');

    await user.type(searchBar, 'hello');
    await user.click(button);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByRole('search')).toHaveFormValues({
      search: 'hello',
    });
  });

  it('submits query when provided an input with one character', async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
    );

    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'search button' });
    const searchBar = screen.getByRole('searchbox');

    await user.type(searchBar, 'h');
    await user.click(button);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByRole('search')).toHaveFormValues({
      search: 'h',
    });
  });

  it('removes error message when input is successfully submitted', async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
    );

    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'search button' });
    const searchBar = screen.getByRole('searchbox');

    await user.click(button);

    expect(screen.getByRole('alert')).toBeInTheDocument();

    await user.type(searchBar, 'hello');
    await user.click(button);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByRole('search')).toHaveFormValues({
      search: 'hello',
    });
  });
});
