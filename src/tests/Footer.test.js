import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndContext from '../helper/renderWithRouterAndContext';

describe('Testando componente Footer', () => {
  it('verifica se tem duas imagens na tela', () => {
    renderWithRouterAndContext(<App />, '/profile');
    screen.getByTestId('drinks-bottom-btn');
    screen.getByTestId('meals-bottom-btn');
  });

  it('verifica se ao clicar na imagem DRINKS o usuario é redirecionado corretamente', () => {
    const { history } = renderWithRouterAndContext(<App />, '/profile');
    const imgDrinks = screen.getByTestId('drinks-bottom-btn');
    // screen.debug();

    userEvent.click(imgDrinks);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });

  it('verifica se ao clicar na imagem MEALS o usuario é redirecionado corretamente', () => {
    const { history } = renderWithRouterAndContext(<App />, '/profile');
    const imgMeals = screen.getByTestId('meals-bottom-btn');

    userEvent.click(imgMeals);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
    // screen.debug();
  });
});
