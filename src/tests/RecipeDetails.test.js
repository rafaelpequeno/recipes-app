import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import clipboardCopy from 'clipboard-copy';
import App from '../App';
import { mockDrinkDetailsGg } from '../helper/mockDrinkDetailsGg';
import { mockDrinks } from '../helper/mockDrinks';
import { mockMealDetailsSushi } from '../helper/mockMealDetailsSushi';
import renderWithRouterAndContext from '../helper/renderWithRouterAndContext';

jest.mock('clipboard-copy');
const whiteHeart = 'whiteHeartIcon.svg';
const blackHeart = 'blackHeartIcon.svg';
describe('Testando pagina RecipeDetails para Meal', () => {
  it('verifica se o button tem o titulo continue recipe', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockDrinks)
        .mockResolvedValue(mockDrinks)
        .mockResolvedValue(mockMealDetailsSushi),
    });

    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: {}, meals: { 53065: ['0-ingredient-step', '1-ingredient-step'] } }));
    renderWithRouterAndContext(<App />, '/meals/53065');

    await screen.findByRole('button', { name: /continue recipe/i });

    // screen.debug();
  });

  afterEach(() => jest.restoreAllMocks());

  it('verifica o button favoritar e compartilhar, e o button de start', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockDrinks)
        .mockResolvedValue(mockDrinks)
        .mockResolvedValue(mockMealDetailsSushi),
    });

    const { history } = renderWithRouterAndContext(<App />, '/meals/53065');

    const shareBtn = await screen.findByTestId('share-btn');
    const favoriteBtn = await screen.findByTestId('favorite-btn');

    userEvent.click(shareBtn);
    expect(clipboardCopy).toHaveBeenCalledWith('http://localhost:3000/meals/53065');
    await waitForElementToBeRemoved(() => screen.getByText('Link copied!'), {
      timeout: 3000, // Define o tempo limite em milissegundos
      interval: 1000, // Define o intervalo de verificação em milissegundos
    });

    expect(favoriteBtn).toHaveAttribute('src', whiteHeart);
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', blackHeart);
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', whiteHeart);

    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');

    userEvent.click(startRecipeBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals/53065/in-progress');

    // screen.debug();
  });
});

describe('Testando pagina RecipeDetails para Drink', () => {
  it('verifica se o button tem o titulo continue recipe', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockDrinks)
        .mockResolvedValue(mockDrinks)
        .mockResolvedValue(mockDrinkDetailsGg),
    });

    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: { 15997: ['0-ingredient-step'] }, meals: {} }));
    renderWithRouterAndContext(<App />, '/drinks/15997');

    await screen.findByRole('button', { name: /continue recipe/i });

    // screen.debug();
  });

  afterEach(() => jest.restoreAllMocks());

  it('verifica o button favoritar e compartilhar, e o button de start', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockDrinks)
        .mockResolvedValue(mockDrinks)
        .mockResolvedValue(mockDrinkDetailsGg),
    });

    const { history } = renderWithRouterAndContext(<App />, '/drinks/15997');

    const shareBtn = await screen.findByTestId('share-btn');
    const favoriteBtn = await screen.findByTestId('favorite-btn');

    userEvent.click(shareBtn);
    expect(clipboardCopy).toHaveBeenCalledWith('http://localhost:3000/drinks/15997');
    await waitForElementToBeRemoved(() => screen.getByText('Link copied!'), {
      timeout: 3000, // Define o tempo limite em milissegundos
      interval: 1000, // Define o intervalo de verificação em milissegundos
    });

    expect(favoriteBtn).toHaveAttribute('src', whiteHeart);
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', blackHeart);
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', whiteHeart);

    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');

    userEvent.click(startRecipeBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/15997/in-progress');

    // screen.debug();
  });
});
