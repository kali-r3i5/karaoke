import React from 'react';
import { cleanup } from '@testing-library/react';
import { render } from '../../test-utils';
import RoundLetter from './RoundLetter';

afterEach(cleanup);

describe('RoundLetter', () => {
  it('should render properly', () => {
    const { container } = render(<RoundLetter letter="a" />);
    expect(container).toBeInTheDocument();
  });

  it('should render proper text', () => {
    const { getByText } = render(<RoundLetter letter="a" />);
    expect(getByText(/a/i)).toBeInTheDocument();
  });
});
