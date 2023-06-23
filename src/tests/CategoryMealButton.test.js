import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { mockDrinks } from '../helper/mockDrinks';
import { mockMeals } from '../helper/mockMeals';

import { mockCategoryMealBeef } from '../helper/mockCategoryMealBeef';
import { mockDrinksCategories } from '../helper/mockDrinksCategories';
import { mockMealsCategories } from '../helper/mockMealsCategories';
import renderWithRouterAndContext from '../helper/renderWithRouterAndContext';

describe('Testando componente CategoryMealButton', () => {
  it('verifica o filtro de receitas por beef e all', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mockMeals)
        .mockResolvedValueOnce(mockDrinks)
        .mockResolvedValueOnce(mockMealsCategories)
        .mockResolvedValueOnce(mockDrinksCategories)
        .mockResolvedValueOnce(mockCategoryMealBeef)
        .mockResolvedValue(mockMeals),
    });

    renderWithRouterAndContext(<App />, '/meals');
    const btnCategoryBeef = await screen.findByRole('button', { name: /beef/i });
    await act(async () => {
      userEvent.click(btnCategoryBeef);
    });
    const allRecipesBeef = await screen.findAllByText(/beef/i);
    expect(allRecipesBeef).toHaveLength(13);

    const btnCategoryAll = await screen.findByRole('button', { name: /all/i });
    await act(async () => {
      userEvent.click(btnCategoryAll);
    });

    await screen.findByRole('heading', { name: /corba/i });
    await screen.findByRole('heading', { name: /timbits/i });

    // screen.debug();
  });

  afterEach(() => jest.clearAllMocks());
  it('verifica se ao clicar no filtro duas vezes retorna ao filtro all', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mockMeals)
        .mockResolvedValueOnce(mockDrinks)
        .mockResolvedValueOnce(mockMealsCategories)
        .mockResolvedValueOnce(mockDrinksCategories)
        .mockResolvedValueOnce(mockCategoryMealBeef)
        .mockResolvedValue(mockMeals),
    });
    renderWithRouterAndContext(<App />, '/meals');
    const btnCategoryBeef = await screen.findByTestId('Beef-category-filter');
    await act(async () => {
      userEvent.click(btnCategoryBeef);
    });
    const allRecipesBeef = await screen.findAllByText(/beef/i);
    expect(allRecipesBeef).toHaveLength(13);
    await act(async () => {
      userEvent.click(btnCategoryBeef);
    });
    await screen.findByRole('heading', { name: /corba/i });
    await screen.findByRole('heading', { name: /timbits/i });

    // screen.debug();
  });
});
