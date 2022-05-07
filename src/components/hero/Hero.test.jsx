import React from 'react';
import { render } from '../../test-utils';
import Hero from './Hero';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Hero', () => {
  it('should render properly', () => {
    const { container } = render(<Hero />);
    expect(container).toBeInTheDocument();
  });

  it('should contain right text', async () => {
    const { getByText } = render(<Hero />);
    expect(getByText(/Karaokê/i)).toBeInTheDocument();
    expect(getByText(/Night/i)).toBeInTheDocument();
    expect(getByText('Nacionais')).toBeInTheDocument();
    expect(getByText(/internacionais/i)).toBeInTheDocument();
    expect(getByText('Pesquisar Artista / Música')).toBeInTheDocument();
  });
});
