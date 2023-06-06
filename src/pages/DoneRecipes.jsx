import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import FilterButtons from '../components/FilterButtons';

function DoneRecipes() {
  const [recipesDone, setRecipesDone] = useState([]);
  const [showCopy, setShowCopy] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setRecipesDone(recipes);
  }, []);

  const filterByCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <FilterButtons onClick={ ({ target: { name } }) => filterByCategory(name) } />
      <div className="receitas">
        {recipesDone
          .filter((recipe) => (recipe.type.includes(selectedCategory)))
          .map((recipe, index) => (
            recipe.type === 'meal' ? ( // meal card
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
                <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
                {recipe.tags.slice(0, 2).map((tag, indexTag) => (
                  <p
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    key={ indexTag }
                  >
                    {tag}
                  </p>
                ))}
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
                  <img src="src/images/shareIcon.svg" alt="compartilhar" />
                  {showCopy && 'Link copied!'}
                </button>
              </div>
            ) : (// drink card
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
                <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
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
                  <img src="src/images/shareIcon.svg" alt="compartilhar" />
                  {showCopy && 'Link copied!'}
                </button>
              </div>
            )
          ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
