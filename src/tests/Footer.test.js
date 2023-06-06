import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import Profile from '../pages/Profile';

describe('Testando componente Footer', () => {
  it('verifica se tem duas imagens na tela', () => {
    renderWithRouter(<Profile />);
    screen.getByTestId('drinks-bottom-btn');
    screen.getByTestId('meals-bottom-btn');
  });

  it('verifica se ao clicar na imagem DRINKS o usuario é redirecionado corretamente', () => {
    const { history } = renderWithRouter(<Profile />);
    const imgDrinks = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(imgDrinks);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });

  it('verifica se ao clicar na imagem MEALS o usuario é redirecionado corretamente', () => {
    const { history } = renderWithRouter(<Profile />);
    const imgMeals = screen.getByTestId('meals-bottom-btn');

    userEvent.click(imgMeals);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
