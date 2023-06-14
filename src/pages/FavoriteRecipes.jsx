import React from 'react';
// import { Link } from 'react-router-dom';
// import copy from 'clipboard-copy';
import FilterButtons from '../components/FilterButtons';
import Header from '../components/Header';

function FavoriteRecipes() {
  // const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  // const [showCopy, setShowCopy] = useState(false);
  // const [selectedCategory, setSelectedCategory] = useState('');

  // useEffect(() => {
  //   const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //   setFavoriteRecipes(favRecipes);
  // }, []);

  // const filterByCategory = (category) => {
  //   setSelectedCategory(category);
  // };

  // handleFav = (id) => {
  //   const newFav = favoriteRecipes.filter((recipe) => recipe.id !== id);
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(newFav));
  // };

  return (
    <div>
      <Header title="Favorite Recipes" />
      <FilterButtons onClick={ ({ target: { name } }) => filterByCategory(name) } />
      {/* <div className="favReceitas">
        {favoriteRecipes
          .filter((recipe) => (recipe.type.includes(selectedCategory)))
          .map((recipe, index) => (
            recipe.type === 'meal' ? (
            // ----------MEAL CARD---------------
              <div key={ index }>
                <Link
                  to={ `/meals/${recipe.id}` }
                >
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt="imgreceita"
                  />
                  <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                </Link>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${recipe.nationality} - ${recipe.category}`}
                </p>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => {
                    const destinationUrl = window.location.href
                      .split(window.location.pathname)[0]
                  + (recipe.type === 'meal'
                    ? `/meals/${recipe.id}`
                    : `/drinks/${recipe.id}`);
                    copy(destinationUrl).then(() => { setShowCopy(true); });
                  } }
                >
                  <img src={ shareIcon } alt="compartilhar" />
                  {showCopy && 'Link copied!'}
                </button>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  onClick={ handleFav(recipe.id) }
                >
                  <img src="src/images/blackHeartIcon.svg" alt="desfavoritar" />
                </button>
              </div>
            ) : (
            // ----------DRINK CARD---------------
              <div key={ index }>
                <Link
                  to={ `/drinks/${recipe.id}` }
                >
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt="imgreceita"
                  />
                  <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipe.alcoholicOrNot}
                </p>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => {
                    const destinationUrl = window.location.href
                      .split(window.location.pathname)[0]
                  + (recipe.type === 'meal'
                    ? `/meals/${recipe.id}`
                    : `/drinks/${recipe.id}`);
                    copy(destinationUrl).then(() => { setShowCopy(true); });
                  } }
                >
                  <img src={ shareIcon } alt="compartilhar" />
                  {showCopy && 'Link copied!'}
                </button>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  onClick={ handleFav(recipe.id) }
                >
                  <img src="src/images/blackHeartIcon.svg" alt="desfavoritar" />
                </button>
              </div>
            )
          ))}
      </div> */}
    </div>
  );
}

export default FavoriteRecipes;
