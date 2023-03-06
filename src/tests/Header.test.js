// import React from 'react';
// import { screen, waitFor } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
// import App from '../App';
// import { renderWithRouterAndRedux } from './helpers/renderWith';

// describe('Testa o componente Header', () => {
//   test('Testa se o header está presente nas páginas necessárias', async () => {
//     const { history } = renderWithRouterAndRedux(<App />);

//     await act(async () => {
//       await history.push('/meals');
//     });
//     const profileIcon = await screen.findByAltText('profile icon');
//     expect(profileIcon).toBeInTheDocument();

//     await act(async () => {
//       history.push('/drinks');
//     });
//     expect(profileIcon).toBeInTheDocument();

//     await act(async () => {
//       history.push('/profile');
//     });
//     await waitFor(() => expect(profileIcon).toBeInTheDocument());

//     await act(async () => {
//       history.push('/favorite-recipes');
//     });
//     expect(profileIcon).toBeInTheDocument();

//     await act(async () => {
//       history.push('/done-recipes');
//     });
//     expect(profileIcon).toBeInTheDocument();

//     await act(async () => {
//       history.push('/recipes');
//     });
//     expect(profileIcon).toBeInTheDocument();

//     await act(async () => {
//       history.push('/');
//     });
//     expect(profileIcon).not.toBeInTheDocument();
//   });
// });
