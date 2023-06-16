import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import clipboardCopy from 'clipboard-copy';
import App from '../App';
import renderWithRouterAndContext from '../helper/renderWithRouterAndContext';

jest.mock('clipboard-copy');
describe('Testando a pagina FavoriteRecipes', () => {
  const url = '/favorite-recipes';
  const favoriteRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];

  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    navigator.clipboard = {
      writeText: jest.fn(),
    };
  });

  it('Verifica se as receitas renderizam corretamente', () => {
    renderWithRouterAndContext(<App />, url);
    const meal = screen.getByText(/spicy arrabiata penne/i);
    const drink = screen.getByText(/aquamarine/i);
    // screen.debug();
    expect(meal).toBeInTheDocument();
    expect(drink).toBeInTheDocument();
  });

  it('Verifica se ao clicar no nome da comida e redirecionado corretamente', () => {
    const { history } = renderWithRouterAndContext(<App />, url);
    const mealLink = screen.getByText(/spicy arrabiata penne/i);
    // screen.debug();
    userEvent.click(mealLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals/52771');
  });

  it('Verifica se ao clicar na imagem da comida e redirecionado corretamente', () => {
    const { history } = renderWithRouterAndContext(<App />, url);
    const mealLink = screen.getByRole('link', { name: /spicy arrabiata penne/i });
    within(mealLink).getByRole('img', { hidden: true });
    userEvent.click(mealLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals/52771');
  });

  it('Verifica se ao clicar no nome do drink e redirecionado corretamente', () => {
    const { history } = renderWithRouterAndContext(<App />, url);
    const drinkLink = screen.getByText(/aquamarine/i);
    userEvent.click(drinkLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/178319');
  });

  it('Verifica se ao clicar na imagem do drink e redirecionado corretamente', () => {
    const { history } = renderWithRouterAndContext(<App />, url);
    const drinkLink = screen.getByRole('link', { name: /aquamarine/i });
    within(drinkLink).getByRole('img', { hidden: true });
    userEvent.click(drinkLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/178319');
  });

  it('Testa a funcao de copiar com drinks', () => {
    renderWithRouterAndContext(<App />, url);
    const button = screen.getByTestId('1-horizontal-share-btn');
    // screen.debug();
    userEvent.click(button);
    expect(clipboardCopy).toHaveBeenCalledWith('http://localhost:3000/drinks/178319');
  });

  it('Testa a funcao de copiar com meals', () => {
    renderWithRouterAndContext(<App />, url);
    const button = screen.getByTestId('0-horizontal-share-btn');
    // screen.debug();
    userEvent.click(button);
    const msg = screen.getByTestId('linkmsg');
    expect(msg).toBeInTheDocument();
    expect(clipboardCopy).toHaveBeenCalledWith('http://localhost:3000/meals/52771');
    const timer = setTimeout(() => {
      expect(msg).not.toBeInTheDocument();
    }, 3000);
    clearTimeout(timer);
  });

  it('Testa a funcao de copiar com meals', () => {
    renderWithRouterAndContext(<App />, url);
    const button = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(button);
    const msg = screen.getByTestId('linkmsg');
    expect(msg).toBeInTheDocument();
    setTimeout(() => {
      expect(msg).not.toBeInTheDocument();
    }, 5000);
  });

  it('Testa o filtro de drinks', () => {
    renderWithRouterAndContext(<App />, url);
    const drink = screen.getByText(/aquamarine/i);
    const buttonDrink = screen.getByRole('button', { name: /drinks/i });
    userEvent.click(buttonDrink);
    expect(drink).not.toBeInTheDocument();
  });

  it('Testa a funcao de desfavoritar', () => {
    renderWithRouterAndContext(<App />, url);
    const favButton = screen.getByTestId('1-horizontal-favorite-btn');
    const favButtonNext = screen.getByTestId('0-horizontal-favorite-btn');
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual(favoriteRecipes);
    userEvent.click(favButton);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual([favoriteRecipes[0]]);
    userEvent.click(favButtonNext);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual([]);
  });
});
