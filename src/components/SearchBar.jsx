import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import myContext from '../context/myContext';
import {
  fetchFirstLetterSearchDrinks,
  fetchIngredientSearchDrinks,
  fetchRecipeNameSearchDrinks,
} from '../services/drinkAPI';
import {
  fetchFirstLetterSearchMeals,
  fetchIngredientSearchMeals,
  fetchRecipeNameSearchMeals,
} from '../services/mealAPI';
import '../styles/SearchBar.css';

function SearchBar() {
  const [filterType, setFilterType] = useState('name'); // Estado para armazenar o tipo de filtro selecionado
  const [searchName, setSearchName] = useState(''); // Estado para armazenar o valor de pesquisa
  const { setFilteredMeals, setFilteredDrinks } = useContext(myContext);
  const location = useLocation();
  const { pathname } = location;
  const history = useHistory();

  const handleFilterChange = (event) => {
    setFilterType(event.target.value); // Atualiza o estado do tipo de filtro selecionado com o valor do radio button clicado
  };

  const handleSearchChange = (event) => {
    setSearchName(event.target.value); // Atualiza o estado do valor de pesquisa com o valor digitado no campo de input
  };

  const compareLengthResultsMeals = async (funcao) => {
    const fetch = await funcao(searchName);
    if (fetch !== null) {
      if (fetch.length === 1) {
        history.push(`/meals/${fetch[0].idMeal}`);
      } else {
        const recipes12 = 12;
        setFilteredMeals((fetch.filter((_meal, index) => index < recipes12)));
      }
    } else {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const compareLengthResultsDrinks = async (funcao) => {
    const fetch = await funcao(searchName);
    if (fetch !== null) {
      if (fetch.length === 1) {
        history.push(`/drinks/${fetch[0].idDrink}`);
      } else {
        const recipes12 = 12;
        setFilteredDrinks((fetch.filter((_drink, index) => index < recipes12)));
      }
    } else {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const handleSearchMeals = async () => {
    switch (filterType) {
    case 'ingredient':
      compareLengthResultsMeals(fetchIngredientSearchMeals);
      break;
    case 'name':
      compareLengthResultsMeals(fetchRecipeNameSearchMeals);
      break;
    case 'first_letter':
      if (searchName.length === 1) {
        compareLengthResultsMeals(fetchFirstLetterSearchMeals);
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
      break;
    default:
      break;
    }
  };

  const handleSearchDrinks = async () => {
    switch (filterType) {
    case 'ingredient':
      compareLengthResultsDrinks(fetchIngredientSearchDrinks);
      break;
    case 'name':
      compareLengthResultsDrinks(fetchRecipeNameSearchDrinks);
      break;
    case 'first_letter':
      if (searchName.length === 1) {
        compareLengthResultsDrinks(fetchFirstLetterSearchDrinks);
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
      break;
    default:
      break;
    }
  };

  return (
    <form className="search-bar">
      <div className="search-bar-form-div">
        <label>
          <input
            type="radio"
            name="filter"
            value="ingredient"
            onChange={ handleFilterChange }
            data-testid="ingredient-search-radio"
          />
          Ingrediente
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            value="name"
            checked
            onChange={ handleFilterChange }
            data-testid="name-search-radio"
          />
          Nome
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            value="first_letter"
            onChange={ handleFilterChange }
            data-testid="first-letter-search-radio"
          />
          Letra
        </label>
      </div>
      <div className="search-bar-form-div">
        <input
          type="text"
          placeholder="Pesquisar"
          data-testid="search-input"
          onChange={ handleSearchChange }
          value={ searchName }
        />
        <button
          type="button"
          onClick={ pathname === '/meals' ? handleSearchMeals : handleSearchDrinks }
          data-testid="exec-search-btn"
        >
          Pesquisar
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
