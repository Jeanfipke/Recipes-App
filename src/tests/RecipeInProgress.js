import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('testa componente RecipesInProgress', () => {
  test('testa se tudo está na tela', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/meals/52977/in-progress');
    });

    const btns = screen.getAllByRole('button');
    expect(btns).toHaveLength(4);
    await screen.findAllByRole('checkbox');

    await waitFor(() => {
      const title = screen.getByTestId('recipe-title');
      const pic = screen.getByTestId('recipe-photo');
      const category = screen.getByTestId('recipe-category');
      const main = screen.getByRole('main');
      expect(title && pic && category && main).toBeInTheDocument();
    });

    act(() => {
      history.push('/drinks/15997/in-progress');
    });
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');

    await waitFor(() => {
      const title = screen.getByTestId('recipe-title');
      const pic = screen.getByTestId('recipe-photo');
      const category = screen.getByTestId('recipe-category');
      const main = screen.getByRole('main');
      expect(title && pic && category && main).toBeInTheDocument();
    });
    const checkbox = await screen.findByLabelText('Galliano2 1/2 shots');
    act(() => {
      userEvent.click(checkbox);
    });
    act(() => {
      history.push('/drinks/15997');
    });
    act(() => {
      history.push('/drinks/15997/in-progress');
    });
  });
});
