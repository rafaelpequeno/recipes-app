import clipboardCopy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FilterButtons from '../components/FilterButtons';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../styles/DoneRecipes.css';
import Footer from '../components/Footer';

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

  const handleCopy = (type, id) => {
    setShowCopy(true);
    if (type === 'meals') {
      clipboardCopy(`http://localhost:3000/meals/${id}`);
    } else if (type === 'drinks') {
      clipboardCopy(`http://localhost:3000/drinks/${id}`);
    }

    const seconds = 2000;
    setTimeout(() => {
      setShowCopy(false);
    }, seconds);
  };

  const handledate = (date) => {
    const transformDate = new Date(date);

    const day = transformDate.getDate();
    const month = transformDate.getMonth();
    const fullYear = transformDate.getFullYear();

    return `${month}/${day}/${fullYear}`;
  };

  return (
    <div className="done-recipes-page">
      <Header title="Done Recipes" />
      <FilterButtons onClick={ ({ target: { name } }) => filterByCategory(name) } />
      <span className="link-copied">
        {showCopy && <p data-testid="linkmsg">Link copied!</p>}
      </span>
      <div className="receitas">
        {recipesDone && recipesDone
          .filter((recipe) => (recipe.type.includes(selectedCategory)))
          .map((recipe, index) => (
            recipe.type === 'meal' ? (
              // ----------MEAL CARD---------------
              <div key={ index } className="done-recipe-card">
                <Link
                  to={ `/meals/${recipe.id}` }
                >
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt="imgreceita"
                    aria-hidden="true"
                    className="done-recipe-thumb"
                  />
                </Link>
                {!showCopy && (
                  <span className="done-share-icon">
                    <img
                      src={ shareIcon }
                      alt="compartilhar"
                      data-testid={ `${index}-horizontal-share-btn` }
                      onClick={ () => handleCopy('meals', recipe.id) }
                      aria-hidden="true"
                    />
                  </span>
                )}
                <span className="done-meal-name-and-country">
                  <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {`${recipe.nationality} - ${recipe.category}`}
                  </p>
                </span>
                <span>
                  <p
                    data-testid={ `${index}-horizontal-done-date` }
                    className="done-meal-date"
                  >
                    {`Done in ${handledate(recipe.doneDate)}`}
                  </p>
                </span>
                <span className="done-meal-tags">
                  {recipe.tags.slice(0, 2).map((tag, indexTag) => (
                    <p
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                      key={ indexTag }
                    >
                      {tag}
                    </p>
                  ))}
                </span>
              </div>
            ) : (
              // ----------DRINK CARD---------------
              <div key={ index } className="done-recipe-card">
                <Link
                  to={ `/drinks/${recipe.id}` }
                >
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt="imgreceita"
                    aria-hidden="true"
                    className="done-recipe-thumb"
                  />
                </Link>
                {!showCopy && (
                  <img
                    className="done-share-icon"
                    src={ shareIcon }
                    alt="compartilhar"
                    data-testid={ `${index}-horizontal-share-btn` }
                    onClick={ () => handleCopy('drinks', recipe.id) }
                    aria-hidden="true"
                  />
                )}
                <span className="done-meal-name-and-country">
                  <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {recipe.alcoholicOrNot}
                  </p>
                </span>
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                  className="done-meal-date"
                >
                  {`Done in ${handledate(recipe.doneDate)}`}

                </p>
              </div>
            )
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default DoneRecipes;
