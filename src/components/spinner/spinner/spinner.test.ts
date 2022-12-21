import {
  describe, expect, it,
} from '@jest/globals';
import generateSpinner from './spinner';

describe('generateSpinner', () => {
  const labels = ['Test', 'Test2'];

  const spinner = generateSpinner({
    labels,
  });

  it('generates component correctly', () => {
    expect(spinner).toMatchSnapshot();
  });
});
