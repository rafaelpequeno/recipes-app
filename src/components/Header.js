import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/Header.css';
import SearchBar from './SearchBar';

function Header({ renderSearchComponent = false, title }) {
  // Estado Inicial
  //   'renderSearchComponent' indica se a barra de busca será exibida ou não.
  //   A barra de busca não será exibida se não for solicitada via props

  // state: Estado do Componente
  const [renderSearch, setRenderSearch] = useState(false);

  // altera a condição da SearchBar, entre visível e invisível
  const fToggleSearchBar = () => (
    renderSearch ? setRenderSearch(false) : setRenderSearch(true)
  );

  return (
    <>
      <header className="main-header">
        <span
          className="app-title"
        >
          <span className="app-name">
            RECIPES
          </span>
          app
        </span>

        { /* exibição condicional do botão de busca */ }
        {
          renderSearchComponent && (
            <button
              className="button-icon"
              onClick={ fToggleSearchBar }
            >
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="search-icon"
                className="header-icon"
              />
            </button>
          )
        }

        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile-icon"
            className="header-icon"
          />
        </Link>

      </header>
      <section
        data-testid="page-title"
        className="page-title"
      >
        { title }
      </section>

      { /* exibição condicional do componente SearchBar */ }
      {
        renderSearch && <SearchBar />
      }
    </>
  );
}

Header.propTypes = {
  renderSearchComponent: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default Header;
