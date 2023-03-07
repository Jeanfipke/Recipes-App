import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import { meals } from './mocksTests/mealsRecipesMock';
import { drinks } from './mocksTests/drinksRecipesMock';

describe('Testes para a página Recipes', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Testa se a página renderiza corretamente a rota /meals', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    const url1 = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const url2 = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

    console.log(fetch);
    expect(fetch).toBeCalled();
    expect(fetch).toBeCalledTimes(2);
    expect(fetch).toBeCalledWith(url1);
    expect(fetch).toBeCalledWith(url2);

    const recipeList = await screen.findAllByRole('heading', { level: 2 });
    expect(recipeList).toHaveLength(12);
    expect(recipeList[0].innerHTML).toBe('Corba');

    const buttonList = await screen.findAllByRole('button');
    expect(buttonList).toHaveLength(6);
    expect(buttonList[5].innerHTML).toBe('All');
  });

  it('Testa se a página renderiza corretamente a rota /drinks', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });

    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });

    const recipeList = await screen.findAllByRole('heading', { level: 2 });
    expect(recipeList).toHaveLength(12);
    expect(recipeList[0].innerHTML).toBe('GG');

    const buttonList = await screen.findAllByRole('button');
    expect(buttonList).toHaveLength(6);
    expect(buttonList[5].innerHTML).toBe('All');
  });

  it('Testa buttons de categoria', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    const initialState = {
      category: '',
    };

    const { history } = renderWithRouterAndRedux(<App />, initialState);
    act(() => {
      history.push('/meals');
    });

    await waitFor(() => {
      const firstButton = screen.getByRole('button', { name: 'beef' });

      expect(firstButton).toBeInTheDocument();
      userEvent.click(firstButton);
      expect(firstButton).toBe('beef');
    });
  });
});
