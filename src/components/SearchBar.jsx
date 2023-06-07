import React, { useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import '../styles/SearchBar.css';

function SearchBar() {
  const [filterType, setFilterType] = useState('name'); // Estado para armazenar o tipo de filtro selecionado
  const [searchName, setSearchName] = useState(''); // Estado para armazenar o valor de pesquisa

  const location = useLocation();
  const { pathname } = location;

  const fetchIngredientSearch = async (ingredient) => {
    if (pathname === '/meals') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = response.json();
      return data;
    } if (pathname === '/drinks') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = response.json();
      return data;
    }
  };

  const fetchRecipeNameSearch = async (name) => {
    if (pathname === '/meals') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
      const data = response.json();
      return data;
    } if (pathname === '/drinks') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
      const data = response.json();
      return data;
    }
  };

  const fetchFirstLetterSearch = async (letter) => {
    if (pathname === '/meals') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
      const data = response.json();
      return data;
    } if (pathname === '/drinks') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
      const data = response.json();
      return data;
    }
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value); // Atualiza o estado do tipo de filtro selecionado com o valor do radio button clicado
  };

  const handleSearchChange = (event) => {
    setSearchName(event.target.value); // Atualiza o estado do valor de pesquisa com o valor digitado no campo de input
  };

  const handleSearchMeals = async () => {
    let ingredientData; // Variável para armazenar os dados da busca por ingrediente
    let nameData; // Variável para armazenar os dados da busca por nome
    let firstLetterData; // Variável para armazenar os dados da busca pela primeira letra

    switch (filterType) {
    case 'ingredient':
      ingredientData = await fetchIngredientSearch(searchName);
      console.log(ingredientData);
      break;
    case 'name':
      nameData = await fetchRecipeNameSearch(searchName);
      console.log(nameData);
      break;
    case 'first_letter':
      if (searchName.length === 1) {
        firstLetterData = await fetchFirstLetterSearch(searchName);
        console.log(firstLetterData);
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
      break;
    default:
      break;
    }
  };

  const handleSearchDrinks = async () => {
    let ingredientDrinksData; // Variável para armazenar os dados da busca por ingrediente
    let nameDrinksData; // Variável para armazenar os dados da busca por nome
    let firstLetterDrinksData; // Variável para armazenar os dados da busca pela primeira letra

    switch (filterType) {
    case 'ingredient':
      ingredientDrinksData = await fetchIngredientSearch(searchName);
      console.log(ingredientDrinksData);
      break;
    case 'name':
      nameDrinksData = await fetchRecipeNameSearch(searchName);
      console.log(nameDrinksData);
      break;
    case 'first_letter':
      if (searchName.length === 1) {
        firstLetterDrinksData = await fetchFirstLetterSearch(searchName);
        console.log(firstLetterDrinksData);
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
            checked={ filterType === 'ingredient' }
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
            checked={ filterType === 'name' }
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
            checked={ filterType === 'first_letter' }
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
