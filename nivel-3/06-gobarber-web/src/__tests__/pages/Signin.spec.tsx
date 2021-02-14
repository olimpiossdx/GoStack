import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import SignIn from '../../pages/Signin';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('SignIn Page', () => {
  it('should be albe to sign in', () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, {
      target: { value: 'jonhdoe@example.com.br' },
    });

    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);
    expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
  });
});
