import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import { meals } from './mocksTests/mealsRecipesMock';

describe('Testes para a página Recipes', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Testa se a página renderiza corretamente a rota /meals/52977/in-progress', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/52977/in-progress'] });

    const mainTitle = await screen.findByRole('heading', { name: /corba/i });
    const mainImg = await screen.findByRole('img', { name: /corba/i });
    const btnFavorite = screen.getByRole('button', { name: /compartilhar/i });
    const btnShare = screen.getByRole('button', { name: /favoritar/i });
    const igredientList = await screen.findAllByRole('list');
    const igredientItem = await screen.findAllByRole('listitem');
    const firstItem = igredientItem[0];
    const firstcheckBox = await screen.findByRole('checkbox', { name: /Lentils/i });
    const firstlabel = await screen.findAllByTestId('0-ingredient-step');
    const firstItemLabel = firstlabel[0];

    expect(mainTitle).toBeInTheDocument();
    expect(mainImg).toBeInTheDocument();
    expect(btnFavorite).toBeInTheDocument();
    expect(btnShare).toBeInTheDocument();
    expect(igredientList).toHaveLength(12);
    expect(firstItem).toHaveTextContent('Lentils 1 cup');
    expect(firstcheckBox).not.toBeChecked();
    expect(firstItemLabel.className).not.toBe('line-through');

    await waitFor(() => {
      userEvent.click(firstcheckBox);
      expect(firstcheckBox).toBeChecked();
    });
    expect(firstItemLabel.className).toBe('line-through');
  });
});
