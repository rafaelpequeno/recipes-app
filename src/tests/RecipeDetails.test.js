import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import clipboardCopy from 'clipboard-copy';
import App from '../App';
import renderWithRouterAndContext from '../helper/renderWithRouterAndContext';

jest.mock('clipboard-copy');

describe('Tests the recipe details page', () => {
  it('Should render meal details', async () => {
    renderWithRouterAndContext(<App />, '/meals/53060');

    await waitFor(() => {
      screen.getByText(/burek/i);
      screen.getByText(/side/i);
      screen.getByText(/150g onion/i);
      screen.getByTestId('instructions');
      screen.getByTestId('video');

      const view = screen.getByTestId('0-recommendation-card');

      within(view).getByRole('img', {
        name: /recipe thumb/i,
      });

      const shareBTN = screen.getByTestId('share-btn');

      userEvent.click(shareBTN);

      expect(clipboardCopy).toHaveBeenCalledTimes(1);
      expect(clipboardCopy).toHaveBeenCalledWith('http://localhost:3000/meals/53060');

    //   const favoriteBTN = screen.getByTestId('favorite-btn');
    });
  });
});
