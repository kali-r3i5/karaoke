import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Hero from './Hero';

afterEach(cleanup);

describe('Hero', () => {
  it('should render properly', () => {
    const { container } = render(<Hero />);
    expect(container).toBeInTheDocument();
  });

  it('should contain right text', () => {
    const { getByText } = render(<Hero />);
    expect(getByText(/Karaokê/i)).toBeInTheDocument();
    expect(getByText(/Night/i)).toBeInTheDocument();
    expect(getByText('Nacionais')).toBeInTheDocument();
    expect(getByText(/internacionais/i)).toBeInTheDocument();
    expect(getByText('Pesquisar Artista / Música')).toBeInTheDocument();
  });
});
