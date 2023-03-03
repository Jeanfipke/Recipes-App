import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

describe('Testa a página de perfil', () => {
  test('Todos os elemento devem estar na página', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    expect(history.location.pathname).toBe('/profile');
    const links = await screen.findAllByRole('button');
    await screen.findByRole('button', { name: /done recipes/i });
    await screen.findByRole('button', { name: /favorite recipes/i });
    await screen.findByRole('button', { name: /logout/i });
    expect(links).toHaveLength(3);
  });
  test('', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    expect(history.location.pathname).toBe('/profile');
    const doneRecipesBtn = await screen.findByRole('button', { name: /done recipes/i });
    const favoriteRecipesBtn = await screen.findByRole('button', { name: /favorite recipes/i });
    const lougoutBtn = await screen.findByRole('button', { name: /logout/i });
    act(async () => {
      userEvent.click(doneRecipesBtn);
    });
    expect(history.location.pathname).toBe('/done-recipes');
    history.push('/profile');
    act(async () => {
      userEvent.click(favoriteRecipesBtn);
    });
    expect(history.location.pathname).toBe('/favorite-recipes');
    history.push('/profile');
    act(async () => {
      userEvent.click(lougoutBtn);
    });
    expect(history.location.pathname).toBe('/');
  });
});
