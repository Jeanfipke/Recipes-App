import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const LOGIN_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const ENTER_BUTTON = 'login-submit-btn';
const VALID_EMAIL = 'tryber@test.com';
const VALID_PASSWORD = '1234567';

describe('Testa a página de perfil', () => {
  test('Todos os elemento devem estar na página', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const login = screen.getByTestId(LOGIN_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByTestId(ENTER_BUTTON);

    expect(button).toBeDisabled();
    act(() => {
      userEvent.type(login, VALID_EMAIL);
      userEvent.type(password, VALID_PASSWORD);
    });
    expect(button).toBeEnabled();
    act(() => {
      userEvent.click(button);
    });
    expect(history.location.pathname).toBe('/meals');

    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');

    const links = await screen.findAllByRole('button');
    await screen.findByRole('button', { name: /done recipes/i });
    await screen.findByRole('button', { name: /favorite recipes/i });
    await screen.findByRole('button', { name: /logout/i });
    expect(links).toHaveLength(6);
  });
  test('Testa funcionalidades dos botões', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');
    const doneRecipesBtn = await screen.findByRole('button', { name: /done recipes/i });
    act(() => {
      userEvent.click(doneRecipesBtn);
    });
    expect(history.location.pathname).toBe('/done-recipes');
    act(() => {
      history.push('/profile');
    });
    const favoriteRecipesBtn = await screen.findByRole('button', { name: /favorite recipes/i });
    act(() => {
      userEvent.click(favoriteRecipesBtn);
    });
    expect(history.location.pathname).toBe('/favorite-recipes');
    act(() => {
      history.push('/profile');
    });
    const lougoutBtn = await screen.findByRole('button', { name: /logout/i });
    act(() => {
      userEvent.click(lougoutBtn);
    });
    expect(history.location.pathname).toBe('/');
  });
});
