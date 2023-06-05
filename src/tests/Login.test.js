// import { render, screen, fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { BrowserRouter } from 'react-router-dom';
// import Login from '../pages/Login';

// const EMAIL_VALID = 'validemail@example.com';
// const EMAIL_INVALID = 'invalidemail';
// const PASSWORD_VALID = 'password123';
// const PASSWORD_INVALID = 'short';

// test('renders the Login component', () => {
//   render(
//     <BrowserRouter>
//       <Login />
//     </BrowserRouter>,
//   );

//   const loginTitle = screen.getByText('LOGIN');
//   expect(loginTitle).toBeInTheDocument();
// });

// test('enables the submit button when email and password are valid', () => {
//   render(
//     <BrowserRouter>
//       <Login />
//     </BrowserRouter>,
//   );

//   const emailInput = screen.getByTestId('email-input');
//   const passwordInput = screen.getByTestId('password-input');
//   const submitButton = screen.getByTestId('login-submit-btn');

//   // Invalid email and password
//   userEvent.type(emailInput, EMAIL_INVALID);
//   userEvent.type(passwordInput, PASSWORD_INVALID);
//   expect(submitButton).toBeDisabled();

//   // Valid email and password
//   userEvent.clear(emailInput);
//   userEvent.clear(passwordInput);
//   userEvent.type(emailInput, EMAIL_VALID);
//   userEvent.type(passwordInput, PASSWORD_VALID);
//   expect(submitButton).not.toBeDisabled();
// });

// test('saves the user email in localStorage after form submission', () => {
//   render(
//     <BrowserRouter>
//       <Login />
//     </BrowserRouter>,
//   );

//   const emailInput = screen.getByTestId('email-input');
//   const passwordInput = screen.getByTestId('password-input');
//   const submitButton = screen.getByTestId('login-submit-btn');

//   // Fill in email and password
//   userEvent.type(emailInput, EMAIL_VALID);
//   userEvent.type(passwordInput, PASSWORD_VALID);

//   // Submit the form
//   fireEvent.click(submitButton);

//   // Check if the user email is saved in localStorage
//   const savedUser = JSON.parse(localStorage.getItem('user'));
//   expect(savedUser).toEqual({ email: EMAIL_VALID });
// });

// test('disables the submit button when one input is valid and the other is invalid', () => {
//   render(
//     <BrowserRouter>
//       <Login />
//     </BrowserRouter>,
//   );

//   const emailInput = screen.getByTestId('email-input');
//   const passwordInput = screen.getByTestId('password-input');
//   const submitButton = screen.getByTestId('login-submit-btn');

//   // Valid email, invalid password
//   userEvent.clear(emailInput);
//   userEvent.type(emailInput, EMAIL_VALID);
//   userEvent.type(passwordInput, PASSWORD_INVALID);
//   expect(submitButton).toBeDisabled();

//   // Invalid email, valid password
//   userEvent.clear(emailInput);
//   userEvent.clear(passwordInput);
//   userEvent.type(emailInput, EMAIL_INVALID);
//   userEvent.type(passwordInput, PASSWORD_VALID);
//   expect(submitButton).toBeDisabled();
// });

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';

const EMAIL_VALID = 'validemail@example.com';
const EMAIL_INVALID = 'invalidemail';
const PASSWORD_VALID = 'password123';
const PASSWORD_INVALID = 'short';

const TEST_ID_EMAIL_INPUT = 'email-input';
const TEST_ID_PASSWORD_INPUT = 'password-input';
const TEST_ID_SUBMIT_BUTTON = 'login-submit-btn';

test('renders the Login component', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );

  const loginTitle = screen.getByText('LOGIN');
  expect(loginTitle).toBeInTheDocument();
});

test('enables the submit button when email and password are valid', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );

  const emailInput = screen.getByTestId(TEST_ID_EMAIL_INPUT);
  const passwordInput = screen.getByTestId(TEST_ID_PASSWORD_INPUT);
  const submitButton = screen.getByTestId(TEST_ID_SUBMIT_BUTTON);

  // Invalid email and password
  userEvent.type(emailInput, EMAIL_INVALID);
  userEvent.type(passwordInput, PASSWORD_INVALID);
  expect(submitButton).toBeDisabled();

  // Valid email and password
  userEvent.clear(emailInput);
  userEvent.clear(passwordInput);
  userEvent.type(emailInput, EMAIL_VALID);
  userEvent.type(passwordInput, PASSWORD_VALID);
  expect(submitButton).not.toBeDisabled();
});

test('saves the user email in localStorage after form submission', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );

  const emailInput = screen.getByTestId(TEST_ID_EMAIL_INPUT);
  const passwordInput = screen.getByTestId(TEST_ID_PASSWORD_INPUT);
  const submitButton = screen.getByTestId(TEST_ID_SUBMIT_BUTTON);

  // Fill in email and password
  userEvent.type(emailInput, EMAIL_VALID);
  userEvent.type(passwordInput, PASSWORD_VALID);

  // Submit the form
  fireEvent.click(submitButton);

  // Check if the user email is saved in localStorage
  const savedUser = JSON.parse(localStorage.getItem('user'));
  expect(savedUser).toEqual({ email: EMAIL_VALID });
});

test('disables the submit button when one input is valid and the other is invalid', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );

  const emailInput = screen.getByTestId(TEST_ID_EMAIL_INPUT);
  const passwordInput = screen.getByTestId(TEST_ID_PASSWORD_INPUT);
  const submitButton = screen.getByTestId(TEST_ID_SUBMIT_BUTTON);

  // Valid email, invalid password
  userEvent.clear(emailInput);
  userEvent.type(emailInput, EMAIL_VALID);
  userEvent.type(passwordInput, PASSWORD_INVALID);
  expect(submitButton).toBeDisabled();

  // Invalid email, valid password
  userEvent.clear(emailInput);
  userEvent.clear(passwordInput);
  userEvent.type(emailInput, EMAIL_INVALID);
  userEvent.type(passwordInput, PASSWORD_VALID);
  expect(submitButton).toBeDisabled();
});
