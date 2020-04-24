import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Add a reminder header', () => {
  const { getByText } = render(<App />);
  const header = getByText(/Add a reminder/i);
  expect(header).toBeInTheDocument();
});
