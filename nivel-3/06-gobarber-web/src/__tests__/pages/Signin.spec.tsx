import React from 'react';
import { render } from '@testing-library/react';
import { debug } from 'console';
import SignIn from '../../pages/Signin';

jest.mock('react-router-dom', () => {
  return {
    useHistory: jest.fn(),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('SignIn Page', () => {
  it('should be albe to sign in', () => {
    const result = render(<SignIn />);
    debug();
  });
});
