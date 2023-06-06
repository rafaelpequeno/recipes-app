import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/Header.css';

function Header({ renderSearchComponent, title }) {
  // Estado Inicial
  //   'renderSearchComponent' indica se a barra de busca será exibida ou não.
  //   A barra de busca não será exibida se não for solicitada via props

  // state: Estado do Componente
  const [renderSearch, setRenderSearch] = useState(renderSearchComponent);

  const history = useHistory();

  const fOpenProfile = () => {
    history.push('/profile');
  };

  return (
    <>
      <header className="main-header">
        <span
          data-testid="page-title"
          className="app-title"
        >
          <span className="app-name">
            RECIPES
          </span>
          app
        </span>
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profile-icon"
          className="header-icon"
          onClick={ fOpenProfile }
        />
        <img
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="search-icon"
          className="header-icon"
        />
      </header>
      <section className="page-title">
        { title }
      </section>
    </>
  );
}

Header.propTypes = {
  renderSearchComponent: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
