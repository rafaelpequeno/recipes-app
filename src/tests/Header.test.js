import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndContext from '../helper/renderWithRouterAndContext';

describe('Testando componente Header', () => {
  it('verifica se o componente SearchBar renderiza e desrenderiza na tela', () => {
    renderWithRouterAndContext(<App />, '/drinks');
    const searchTopBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);

    screen.getByTestId('ingredient-search-radio');
    screen.getByTestId('name-search-radio');
    screen.getByTestId('first-letter-search-radio');

    const searchInput = screen.getByTestId('search-input');
    screen.getByTestId('exec-search-btn');

    userEvent.click(searchTopBtn);
    expect(searchInput).not.toBeInTheDocument();
  });
});
