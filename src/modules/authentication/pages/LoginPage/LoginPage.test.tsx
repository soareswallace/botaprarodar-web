import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginService from '../../services/LoginService';
import { renderWithRouterAndAuth } from '../../../../setupTests';
import LoginPage from './LoginPage';

jest.mock('../../services/LoginService', () => {
  return {
    requestLogin: jest.fn().mockImplementation(() => Promise.resolve()),
  };
});
const mockedLoginService = LoginService as jest.Mocked<typeof LoginService>;

async function fillAndSubmitLoginForm(email: string, password: string) {
  const emailField = screen.getByTestId('e-mail');
  const passwordField = screen.getByLabelText('Senha');

  fireEvent.change(emailField, {
    target: { value: email },
  });

  fireEvent.change(passwordField, {
    target: { value: password },
  });

  await userEvent.click(screen.getByTestId('submit-button'));
}

let wrapper: any;

describe('Login Page', () => {
  beforeEach(() => {
    wrapper = renderWithRouterAndAuth(<LoginPage />, {
      route: '/login',
    });
  });

  it('should render login page', async () => {
    expect(wrapper.container).toBeInTheDocument();
  });

  it('should have e-mail and password fields', () => {
    const emailField = screen.getByTestId('e-mail');
    const passwordField = screen.getByLabelText('Senha');
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
  });

  it('should have submit button', () => {
    const submitButton = screen.getByTestId('submit-button');

    expect(submitButton).toBeInTheDocument();
  });

  it('should submit login form', async () => {
    await fillAndSubmitLoginForm('newEmail@example.com', '1234');

    expect(LoginService.requestLogin).toHaveBeenCalledWith(
      'newEmail@example.com',
      '1234',
    );
  });

  it('should throw error when login fails', () => {
    mockedLoginService.requestLogin.mockRejectedValue(new Error());

    expect(LoginService.requestLogin('', '')).rejects.toThrow(Error);
  });

  it('should show error messages when e-mail field is empty', async () => {
    const emailField = screen.getByTestId('e-mail');

    fireEvent.blur(emailField);

    expect(screen.getByText('Digite seu e-mail')).toBeInTheDocument();
  });

  it('should show error messages when password field is empty', async () => {
    const passwordField = screen.getByLabelText('Senha');

    fireEvent.blur(passwordField);

    expect(screen.getByText('Digite sua senha')).toBeInTheDocument();
  });

  it('should not call login api when there are errors', async () => {
    const loginButton = screen.getByTestId('submit-button');

    fireEvent.click(loginButton);

    expect(mockedLoginService.requestLogin).not.toHaveBeenCalled();
  });

  it('should redirect to home page after login', async () => {
    const { history } = wrapper;
    expect(history.location.pathname).toBe('/login');

    mockedLoginService.requestLogin.mockResolvedValue({
      token: 'string',
      displayName: 'string',
      email: 'string',
      authenticated: true,
      uid: 'id',
      currentCommunity: '',
    });

    await fillAndSubmitLoginForm('newEmail@example.com', '1234');
    await waitFor(() =>
      expect(wrapper.history.location.pathname).toBe('/selecao-de-comunidades'),
    );
  });
});
