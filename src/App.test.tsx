import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('should render without crashing', () => {
    render(<App />);
    const logo = screen.getByRole('img', { name: /curebase logo/i }); // Assuming the logo has an alt text "Curebase Logo"
    expect(logo).toBeInTheDocument();
  });
});
