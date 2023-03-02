import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

describe('Testa a página de perfil', () => {
  test('Todos os elemento devem estar na página', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    expect(history.location.pathname).toBe('/profile');
    const links = await screen.findAllByRole('link');
    expect(links).toHaveLength(3);
  });
});
