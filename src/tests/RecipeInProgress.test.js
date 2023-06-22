import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import clipboardCopy from 'clipboard-copy';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { mockInProgressDrink, mockInProgressMeal } from '../helper/mockRecipeInProgress';
import renderWithRouterAndContext from '../helper/renderWithRouterAndContext';

jest.mock('clipboard-copy');
const whiteHeart = 'whiteHeartIcon.svg';
const blackHeart = 'blackHeartIcon.svg';
describe('Testando pagina RecipeInProgress para Meal', () => {
  const { location } = window;

  beforeAll(() => {
    delete window.location;
    window.location = { reload: jest.fn() };
  });

  afterAll(() => {
    window.location = location;
  });

  navigator.clipboard = {
    writeText: jest.fn(),
  };

  const urlMeal = '/meals/53026/in-progress';
  it('verificando ingredientes e button finish', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockInProgressMeal),
    });

    const { history } = renderWithRouterAndContext(<App />, urlMeal);

    const ingredient1 = await screen.findByRole('checkbox', { name: /3 cups broad beans/i });
    const ingredient2 = await screen.findByRole('checkbox', { name: /6 spring onions/i });
    const ingredient3 = await screen.findByRole('checkbox', { name: /4 garlic clove/i });
    const ingredient4 = await screen.findByRole('checkbox', { name: /1\/4 cup parsley/i });
    const ingredient5 = await screen.findByRole('checkbox', { name: /2 tsp cumin/i });
    const ingredient6 = await screen.findByRole('checkbox', { name: /1 tsp baking powder/i });
    const ingredient7 = await screen.findByRole('checkbox', { name: /1\/2 tsp cayenne pepper/i });
    const ingredient8 = await screen.findByRole('checkbox', { name: /spinkling flour/i });
    const ingredient9 = await screen.findByRole('checkbox', { name: /as required vegetable oil/i });
    const finishRecipeBtn = await screen.findByTestId('finish-recipe-btn');

    expect(finishRecipeBtn).toBeDisabled();

    userEvent.click(ingredient1);
    userEvent.click(ingredient2);
    userEvent.click(ingredient3);
    userEvent.click(ingredient4);
    userEvent.click(ingredient5);
    userEvent.click(ingredient6);
    userEvent.click(ingredient7);
    userEvent.click(ingredient8);
    userEvent.click(ingredient9);

    expect(finishRecipeBtn).not.toBeDisabled();
    userEvent.click(finishRecipeBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
    // screen.debug();
  });

  afterEach(() => jest.restoreAllMocks());
  it('verifica se ao recarregar a pagina os ingredientes checados continuam marcados', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockInProgressMeal),
    });

    renderWithRouterAndContext(<App />, urlMeal);
    const ingredient1 = await screen.findByRole('checkbox', { name: /3 cups broad beans/i });
    const ingredient2 = await screen.findByRole('checkbox', { name: /6 spring onions/i });
    const ingredient3 = await screen.findByRole('checkbox', { name: /4 garlic clove/i });

    userEvent.click(ingredient1);
    userEvent.click(ingredient2);
    userEvent.click(ingredient3);

    const ingredientsChecked = await screen.findAllByRole('checkbox', { checked: false });
    expect(ingredientsChecked).toHaveLength(3);

    window.location.reload();

    expect(ingredientsChecked).toHaveLength(3);

    // screen.debug();
  });

  afterEach(() => jest.restoreAllMocks());
  it('verifica os buttons de favoritar e compartilhar', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockInProgressMeal),
    });
    await act(async () => {
      renderWithRouterAndContext(<App />, urlMeal);
    });

    const shareBtn = await screen.findByTestId('share-btn');
    const favoriteBtn = await screen.findByTestId('favorite-btn');

    userEvent.click(shareBtn);
    const msg = await screen.findByText('Link copied!');
    expect(clipboardCopy).toHaveBeenCalledWith('http://localhost:3000/meals/53026');
    const timer = setTimeout(() => {
      expect(msg).not.toBeInTheDocument();
    }, 3000);
    clearTimeout(timer);

    expect(favoriteBtn).toHaveAttribute('src', whiteHeart);
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', blackHeart);

    // screen.debug();
  });
});

describe('Testando pagina RecipeInProgress para DRINK', () => {
  const { location } = window;

  beforeAll(() => {
    delete window.location;
    window.location = { reload: jest.fn() };
  });

  afterAll(() => {
    window.location = location;
  });

  navigator.clipboard = {
    writeText: jest.fn(),
  };

  const urlDrink = '/drinks/17225/in-progress';

  it('verificando ingredientes e button finish', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockInProgressDrink),
    });
    const { history } = renderWithRouterAndContext(<App />, urlDrink);

    const ingredient1 = await screen.findByRole('checkbox', { name: /2 shots gin/i });
    const ingredient2 = await screen.findByRole('checkbox', { name: /1\/2 shot grenadine/i });
    const ingredient3 = await screen.findByRole('checkbox', { name: /1\/2 shot heavy cream/i });
    const ingredient4 = await screen.findByRole('checkbox', { name: /1\/2 shot milk/i });
    const ingredient5 = await screen.findByRole('checkbox', { name: /1\/2 fresh egg white/i });
    const finishRecipeBtn = await screen.findByTestId('finish-recipe-btn');

    expect(finishRecipeBtn).toBeDisabled();

    userEvent.click(ingredient1);
    userEvent.click(ingredient2);
    userEvent.click(ingredient3);
    userEvent.click(ingredient4);
    userEvent.click(ingredient5);

    expect(finishRecipeBtn).not.toBeDisabled();
    userEvent.click(finishRecipeBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
    // screen.debug();
  });

  afterEach(() => jest.restoreAllMocks());
  it('verifica se ao recarregar a pagina os ingredientes checados continuam marcados', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockInProgressDrink),
    });

    renderWithRouterAndContext(<App />, urlDrink);
    const ingredient1 = await screen.findByRole('checkbox', { name: /2 shots gin/i });
    const ingredient2 = await screen.findByRole('checkbox', { name: /1\/2 shot grenadine/i });
    const ingredient3 = await screen.findByRole('checkbox', { name: /1\/2 shot heavy cream/i });

    userEvent.click(ingredient1);
    userEvent.click(ingredient2);
    userEvent.click(ingredient3);

    const ingredientsChecked = await screen.findAllByRole('checkbox', { checked: false });
    expect(ingredientsChecked).toHaveLength(3);

    window.location.reload();

    expect(ingredientsChecked).toHaveLength(3);

    // screen.debug();
  });

  afterEach(() => jest.restoreAllMocks());
  it('verifica os buttons de favoritar e compartilhar', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockInProgressDrink),
    });
    await act(async () => {
      renderWithRouterAndContext(<App />, urlDrink);
    });

    const shareBtn = await screen.findByTestId('share-btn');
    const favoriteBtn = await screen.findByTestId('favorite-btn');

    userEvent.click(shareBtn);
    const msg = await screen.findByText('Link copied!');
    expect(clipboardCopy).toHaveBeenCalledWith('http://localhost:3000/drinks/17225');
    const timer = setTimeout(() => {
      expect(msg).not.toBeInTheDocument();
    }, 3000);
    clearTimeout(timer);

    expect(favoriteBtn).toHaveAttribute('src', whiteHeart);
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', blackHeart);
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', whiteHeart);

    jest.spyOn(Object.getPrototypeOf(global.localStorage), 'getItem')
      .mockReturnValue(JSON.stringify([]));

    // screen.debug();
  });
});
