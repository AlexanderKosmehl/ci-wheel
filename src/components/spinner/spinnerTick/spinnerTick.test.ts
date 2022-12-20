import { describe, expect, it } from '@jest/globals';
import generateSpinnerTick from './spinnerTick';

describe('generateSpinnerTick', () => {
  const spinnerTick = generateSpinnerTick();

  it('generates component correctly', () => {
    expect(spinnerTick).toMatchSnapshot();
  });
});
