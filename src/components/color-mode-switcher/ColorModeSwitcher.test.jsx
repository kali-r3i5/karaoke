import React from 'react';
import { cleanup } from '@testing-library/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { render } from '../../test-utils';

afterEach(cleanup);

describe('ColorModeSwitcher', () => {
  it('should render properly', () => {
    const { container } = render(<ColorModeSwitcher />);
    expect(container).toBeInTheDocument();
  });

  it('should not be disabled', () => {
    const { getByRole } = render(<ColorModeSwitcher />);
    expect(getByRole('button')).not.toBeDisabled();
  });
});
