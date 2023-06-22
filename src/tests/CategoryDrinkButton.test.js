import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { mockDrinks } from '../helper/mockDrinks';
import { mockMeals } from '../helper/mockMeals';

import { mockCategoryDrinkShake } from '../helper/mockCategoryDrinkShake';
import { mockDrinksCategories } from '../helper/mockDrinksCategories';
import { mockMealsCategories } from '../helper/mockMealsCategories';
import renderWithRouterAndContext from '../helper/renderWithRouterAndContext';

describe('Testando componente CategoryDrinkButton', () => {
  it('verifica o filtro de receitas por shake e all', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mockMeals)
        .mockResolvedValueOnce(mockDrinks)
        .mockResolvedValueOnce(mockMealsCategories)
        .mockResolvedValueOnce(mockDrinksCategories)
        .mockResolvedValueOnce(mockCategoryDrinkShake)
        .mockResolvedValue(mockDrinks),
    });

    renderWithRouterAndContext(<App />, '/drinks');
    const btnCategoryShake = await screen.findByRole('button', { name: /shake/i });
    await act(async () => {
      userEvent.click(btnCategoryShake);
    });
    await screen.findByRole('img', { name: /151 florida bushwacker/i });
    await screen.findByRole('img', { name: /jamaica kiss/i });

    const btnCategoryAll = await screen.findByRole('button', { name: /all/i });
    await act(async () => {
      userEvent.click(btnCategoryAll);
    });

    await screen.findByRole('img', { name: /gg/i });
    await screen.findByRole('img', { name: /acid/i });

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
        .mockResolvedValueOnce(mockCategoryDrinkShake)
        .mockResolvedValue(mockDrinks),
    });
    renderWithRouterAndContext(<App />, '/drinks');
    const btnCategoryShake = await screen.findByRole('button', { name: /shake/i });
    await act(async () => {
      userEvent.click(btnCategoryShake);
    });
    await screen.findByRole('img', { name: /151 florida bushwacker/i });
    await screen.findByRole('img', { name: /jamaica kiss/i });
    await act(async () => {
      userEvent.click(btnCategoryShake);
    });

    await screen.findByRole('img', { name: /gg/i });
    await screen.findByRole('img', { name: /acid/i });

    // screen.debug();
  });
});
