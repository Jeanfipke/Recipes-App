import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa o componente Header', () => {
  test('Testa se o header está presente nas páginas necessárias', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const altText = 'profile icon';

    await act(async () => {
      await history.push('/meals');
    });
    await screen.findByAltText(altText);

    await act(async () => {
      history.push('/drinks');
    });
    await screen.findByAltText(altText);

    await act(async () => {
      history.push('/profile');
    });
    await screen.findByAltText(altText);

    await act(async () => {
      history.push('/favorite-recipes');
    });
    await screen.findByAltText(altText);

    await act(async () => {
      history.push('/done-recipes');
    });
    await screen.findByAltText(altText);

    await act(async () => {
      history.push('/recipes');
    });
    await screen.findByAltText(altText);
  });
});
