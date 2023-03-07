import React from 'react';
import copy from 'clipboard-copy';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import ShareImage from '../images/shareIcon.svg';

function BtnShareAndFavorite() {
  const { pathname } = useLocation();

  const shareRecipe = () => {
    copy(`http://localhost:3000${pathname}`);

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Link copied!',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const favoriteRecipe = () => {
    console.log('favorite');
  };

  return (
    <div>
      <button
        data-testid="share-btn"
        onClick={ () => shareRecipe() }
      >
        <img src={ ShareImage } alt="Share Recipe" />
      </button>
      <button
        data-testid="favorite-btn"
        onClick={ () => favoriteRecipe() }
      >
        Favorite
      </button>
    </div>
  );
}

export default BtnShareAndFavorite;
