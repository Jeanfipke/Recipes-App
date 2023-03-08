import React from 'react';
import BtnShareAndFavorite from '../componentes/BtnShareAndFavorite';
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

  // todo O elemento de favoritar a receita deve ter o atributo `data-testid="${index}-horizontal-favorite-btn"`;

  return (
    <>
      <Header />
      <main>
        <div>
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
          {
            [].map((element, index) => (
              <div key={ index }>
                <img src="" alt="" data-testid={ `${index}-horizontal-image` } />
                <h2
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {/* categoria */}
                  {/* nacionalidade ou alcolico */}
                </h2>
                <h2 data-testid={ `${index}-horizontal-name` }>Text</h2>
                <BtnShareAndFavorite />
              </div>
            ))
          }
        </div>
      </main>
    </>
  );
}

export default FavoriteRecipes;
