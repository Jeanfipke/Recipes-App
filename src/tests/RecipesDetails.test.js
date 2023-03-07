// import { screen, waitFor } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
// import App from '../App';
// import { meals } from './mocksTests/mealsRecipesMock';
// import { renderWithRouterAndRedux } from './helpers/renderWith';
// import { drinks } from './mocksTests/drinksRecipesMock';

// describe('Testando Tela de detalhes', () => {
//   it('testando se os itens são renderizados na tela', async () => {
//     jest.spyOn(global, 'fetch');
//     global.fetch.mockResolvedValue({
//       json: jest.fn().mockResolvedValue(meals),
//     }).mockResolvedValue({
//       json: jest.fn().mockResolvedValue(drinks),
//     });
//     renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/52977'] });
//     // act(async () => {
//     //   history.push('/meals/52977');
//     // });

//     expect(fetch).toBeCalled();
//     expect(fetch).toBeCalledTimes(1);
//     expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977');

//     const btnShare = screen.getByRole('button', { name: /compartilhar/i });
//     const btnFavorite = screen.getByRole('button', { name: /favoritar/i });

//     expect(btnShare).toBeInTheDocument();
//     expect(btnFavorite).toBeInTheDocument();

//     await waitFor(() => {
//       // const recipeTitle = screen.findByRole('heading', { name: /Corba/i });
//       const recipeTitle = screen.getByRole('heading', { name: 'Corba' });
//       expect(recipeTitle).toBeInTheDocument();
//     });
//   });
// });
