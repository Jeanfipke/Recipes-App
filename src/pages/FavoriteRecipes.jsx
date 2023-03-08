import React from 'react';
import Header from '../componentes/Header';

function FavoriteRecipes() {
  // TODO doneRecipes
  //!   [{
  //!     id: id-da-receita,
  //!     type: meal-ou-drink,
  //!     nationality: nacionalidade-da-receita-ou-texto-vazio,
  //!     category: categoria-da-receita-ou-texto-vazio,
  //!     alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
  //!     name: nome-da-receita,
  //!     image: imagem-da-receita,
  //!     doneDate: quando-a-receita-foi-concluida,
  //!     tags: array-de-tags-da-receita-ou-array-vazio
  //! }]

  // *   Todos os data-testids estão presentes:
  // * O botão de filtro `All` deve ter o atributo `data-testid="filter-by-all-btn"`;
  // * O botão de filtro `Meals` deve ter o atributo `data-testid="filter-by-meal-btn"`;
  // * O botão de `Drinks` deve ter o atributo `data-testid="filter-by-drink-btn"`;
  // ? A imagem do card de receita deve ter o atributo `data-testid="${index}-horizontal-image"`;
  // ? O texto da categoria da receita deve ter o atributo `data-testid="${index}-horizontal-top-text"`;
  // ? O texto do nome da receita deve ter o atributo `data-testid="${index}-horizontal-name"`;
  // ? O elemento de compartilhar a receita deve ter o atributo `data-testid="${index}-horizontal-share-btn"`;
  // ? O elemento de favoritar a receita deve ter o atributo `data-testid="${index}-horizontal-favorite-btn"`;

  return (
    <>
      <Header />
      <main>
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => {} }
        >
          All
        </button>

        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => {} }
        >
          Meals
        </button>

        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => {} }
        >
          Drinks
        </button>
      </main>
    </>
  );
}

export default FavoriteRecipes;
