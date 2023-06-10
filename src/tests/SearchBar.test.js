import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { mockDrinks } from '../helper/mockDrinks';
import { mockMeals } from '../helper/mockMeals';
import { mockMealsIngradient } from '../helper/mockMealsIngredient';

import { mockDrinksIngredient } from '../helper/mockDrinksIngredient';
import { mockDrinksLetter } from '../helper/mockDrinksLetter';
import { mockDrinksName } from '../helper/mockDrinksName';
import { mockMealsLetter } from '../helper/mockMealsLetter';
import { mockMealsName } from '../helper/mockMealsName';
import renderWithRouterAndContext from '../helper/renderWithRouterAndContext';

describe('Testando componente SearchBar para MEALS', () => {
  it('verifica a pesquisa por nome e se redireciona para a pagina de detalhes caso seja apenas uma receita', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mockMeals)
        .mockResolvedValueOnce(mockDrinks)
        .mockResolvedValue(mockMealsName),
    });
    const { history } = renderWithRouterAndContext(<App />, '/meals');
    const searchTopBtn1 = await screen.findByRole('img', { name: /search-icon/i });
    userEvent.click(searchTopBtn1);
    const searchInput1 = await screen.findByRole('textbox');
    const nameSearchRadio1 = await screen.findByRole('radio', { name: /nome/i });
    userEvent.click(nameSearchRadio1);
    const execSearchBtn1 = await screen.findByRole('button', { name: /pesquisar/i });
    await act(async () => {
      fireEvent.change(searchInput1, { target: { value: 'kumpir' } });
      userEvent.click(execSearchBtn1);
    });
    const { pathname } = history.location;
    expect(expect(pathname).toBe('/meals/52978'));
    // screen.debug();
  });

  afterEach(() => jest.clearAllMocks());
  it('verifica a pesquisa por ingrediente e se renderiza 12 receitas', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mockMeals)
        .mockResolvedValueOnce(mockDrinks)
        .mockResolvedValue(mockMealsIngradient),
    });
    renderWithRouterAndContext(<App />, '/meals');
    const searchTopBtn2 = await screen.findByRole('img', { name: /search-icon/i });
    await act(async () => {
      userEvent.click(searchTopBtn2);
    });
    const searchInput2 = await screen.findByRole('textbox');
    const ingredientSearchRadio2 = await screen.findByTestId('ingredient-search-radio');
    userEvent.click(ingredientSearchRadio2);
    fireEvent.change(searchInput2, { target: { value: 'sugar' } });
    const execSearchBtn2 = await screen.findByRole('button', { name: /pesquisar/i });
    await act(async () => {
      userEvent.click(execSearchBtn2);
    });
    const cardsImg = await screen.findAllByRole('img');
    console.log(cardsImg);
    expect(cardsImg).toHaveLength(16);
    // screen.debug();
  });

  afterEach(() => jest.clearAllMocks());
  it('verifica a pesquisa por letra se tem mais de uma letra retorna um alert', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mockMeals)
        .mockResolvedValueOnce(mockDrinks)
        .mockResolvedValue(mockMealsLetter),
    });
    global.alert = jest.fn().mockReturnValue('Your search must have only 1 (one) character');
    renderWithRouterAndContext(<App />, '/meals');
    const searchTopBtn3 = await screen.findByRole('img', { name: /search-icon/i });
    await act(async () => {
      userEvent.click(searchTopBtn3);
    });
    const searchInput3 = await screen.findByRole('textbox');
    const firstLetterSearchRadio3 = await screen.findByRole('radio', { name: /letra/i });
    userEvent.click(firstLetterSearchRadio3);
    fireEvent.change(searchInput3, { target: { value: 'ca' } });
    const execSearchBtn3 = await screen.findByRole('button', { name: /pesquisar/i });
    await act(async () => {
      userEvent.click(execSearchBtn3);
    });
    expect(global.alert).toHaveBeenCalledTimes(1);
    // expect(global.alert()).toBe('Your search must have only 1 (one) character');
    // screen.debug();
  });

  afterEach(() => jest.clearAllMocks());
  it('verifica se a pesquisa por letra retorna as receitas', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mockMeals)
        .mockResolvedValueOnce(mockDrinks)
        .mockResolvedValue(mockMealsLetter),
    });
    renderWithRouterAndContext(<App />, '/meals');
    const searchTopBtn4 = await screen.findByRole('img', { name: /search-icon/i });
    await act(async () => {
      userEvent.click(searchTopBtn4);
    });
    const searchInput4 = await screen.findByRole('textbox');
    const firstLetterSearchRadio4 = await screen.findByRole('radio', { name: /letra/i });
    userEvent.click(firstLetterSearchRadio4);
    fireEvent.change(searchInput4, { target: { value: 'c' } });
    const execSearchBtn = await screen.findByRole('button', { name: /pesquisar/i });
    await act(async () => {
      userEvent.click(execSearchBtn);
    });
    const namesCardsWithLetterC = await screen.findAllByRole('heading', { level: 3 });
    expect(namesCardsWithLetterC[0]).toHaveTextContent('Chocolate Gateau');
    expect(namesCardsWithLetterC).toHaveLength(12);
    // screen.debug();
  });

  afterEach(() => jest.clearAllMocks());
  it('verifica se retorna um alert caso nao tenha o item da pesquisa', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mockMeals)
        .mockResolvedValueOnce(mockDrinks)
        .mockResolvedValue({ meals: null }),
    });
    global.alert = jest.fn().mockReturnValue('Sorry, we haven\'t found any recipes for these filters.');
    renderWithRouterAndContext(<App />, '/meals');
    const searchTopBtn5 = await screen.findByRole('img', { name: /search-icon/i });
    await act(async () => {
      userEvent.click(searchTopBtn5);
    });
    const searchInput5 = await screen.findByRole('textbox');
    const nameSearchRadio5 = await screen.findByRole('radio', { name: /nome/i });
    userEvent.click(nameSearchRadio5);
    fireEvent.change(searchInput5, { target: { value: 'xablau' } });
    const execSearchBtn5 = await screen.findByRole('button', { name: /pesquisar/i });
    await act(async () => {
      userEvent.click(execSearchBtn5);
    });
    expect(global.alert).toHaveBeenCalledTimes(1);
    // expect(global.alert()).toBe('Sorry, we haven\'t found any recipes for these filters.');
    // screen.debug();
  });
});

describe('Testando componente SearchBar para DRINKS', () => {
  it('verifica a pesquisa por nome e se redireciona para a pagina de detalhes caso seja apenas uma receita', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mockMeals)
        .mockResolvedValueOnce(mockDrinks)
        .mockResolvedValue(mockDrinksName),
    });
    const { history } = renderWithRouterAndContext(<App />, '/drinks');
    const searchTopBtn = await screen.findByRole('img', { name: /search-icon/i });
    userEvent.click(searchTopBtn);
    const searchInput = await screen.findByRole('textbox');
    const nameSearchRadio = await screen.findByTestId('name-search-radio');
    userEvent.click(nameSearchRadio);
    const execSearchBtn = await screen.findByRole('button', { name: /pesquisar/i });
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'Egg Cream' } });
      userEvent.click(execSearchBtn);
    });
    const { pathname } = history.location;
    expect(expect(pathname).toBe('/drinks/12668'));
    // screen.debug();
  });

  afterEach(() => jest.clearAllMocks());
  it('verifica a pesquisa por ingrediente e se renderiza 12 receitas', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mockMeals)
        .mockResolvedValueOnce(mockDrinks)
        .mockResolvedValue(mockDrinksIngredient),
    });
    renderWithRouterAndContext(<App />, '/drinks');
    const searchTopBtn = await screen.findByRole('img', { name: /search-icon/i });
    await act(async () => {
      userEvent.click(searchTopBtn);
    });
    const searchInput = await screen.findByRole('textbox');
    const ingredientSearchRadio = await screen.findByTestId('ingredient-search-radio');
    userEvent.click(ingredientSearchRadio);
    fireEvent.change(searchInput, { target: { value: 'sugar' } });
    const execSearchBtn = await screen.findByRole('button', { name: /pesquisar/i });
    await act(async () => {
      userEvent.click(execSearchBtn);
    });
    const cardsImg = await screen.findAllByRole('img');
    console.log(cardsImg);
    expect(cardsImg).toHaveLength(16);
    // screen.debug();
  });

  afterEach(() => jest.clearAllMocks());
  it('verifica a pesquisa por letra se tem mais de uma letra retorna um alert', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mockMeals)
        .mockResolvedValueOnce(mockDrinks)
        .mockResolvedValue(mockDrinksLetter),
    });
    global.alert = jest.fn().mockReturnValue('Your search must have only 1 (one) character');
    renderWithRouterAndContext(<App />, '/drinks');
    const searchTopBtn = await screen.findByRole('img', { name: /search-icon/i });
    await act(async () => {
      userEvent.click(searchTopBtn);
    });
    const searchInput = await screen.findByRole('textbox');
    const firstLetterSearchRadio = await screen.findByTestId('first-letter-search-radio');
    userEvent.click(firstLetterSearchRadio);
    fireEvent.change(searchInput, { target: { value: 'ya' } });
    const execSearchBtn = await screen.findByRole('button', { name: /pesquisar/i });
    await act(async () => {
      userEvent.click(execSearchBtn);
    });
    expect(global.alert).toHaveBeenCalledTimes(1);
    // expect(global.alert()).toBe('Your search must have only 1 (one) character');
    // screen.debug();
  });

  afterEach(() => jest.clearAllMocks());
  it('verifica se a pesquisa por letra retorna as receitas', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mockMeals)
        .mockResolvedValueOnce(mockDrinks)
        .mockResolvedValue(mockDrinksLetter),
    });
    renderWithRouterAndContext(<App />, '/drinks');
    const searchTopBtn = await screen.findByRole('img', { name: /search-icon/i });
    await act(async () => {
      userEvent.click(searchTopBtn);
    });
    const searchInput = await screen.findByRole('textbox');
    const firstLetterSearchRadio = await screen.findByTestId('first-letter-search-radio');
    userEvent.click(firstLetterSearchRadio);
    fireEvent.change(searchInput, { target: { value: 'y' } });
    const execSearchBtn = await screen.findByRole('button', { name: /pesquisar/i });
    await act(async () => {
      userEvent.click(execSearchBtn);
    });
    const namesCardsWithLetterC = await screen.findAllByRole('heading', { level: 3 });
    expect(namesCardsWithLetterC[0]).toHaveTextContent('Yellow Bird');
    expect(namesCardsWithLetterC).toHaveLength(2);
    // screen.debug();
  });

  afterEach(() => jest.clearAllMocks());
  it('verifica se retorna um alert caso nao tenha o item da pesquisa', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mockMeals)
        .mockResolvedValueOnce(mockDrinks)
        .mockResolvedValue({ drinks: null }),
    });
    global.alert = jest.fn().mockReturnValue('Sorry, we haven\'t found any recipes for these filters.');
    renderWithRouterAndContext(<App />, '/drinks');
    const searchTopBtn = await screen.findByRole('img', { name: /search-icon/i });
    await act(async () => {
      userEvent.click(searchTopBtn);
    });
    const searchInput = await screen.findByRole('textbox');
    const nameSearchRadio = await screen.findByTestId('name-search-radio');
    userEvent.click(nameSearchRadio);
    fireEvent.change(searchInput, { target: { value: 'xablau' } });
    const execSearchBtn = await screen.findByRole('button', { name: /pesquisar/i });
    await act(async () => {
      userEvent.click(execSearchBtn);
    });
    expect(global.alert).toHaveBeenCalledTimes(1);
    // expect(global.alert()).toBe('Sorry, we haven\'t found any recipes for these filters.');
    // screen.debug();
  });
});
