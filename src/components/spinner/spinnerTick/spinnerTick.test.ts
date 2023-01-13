import { describe, expect, it } from 'vitest';
import generateSpinnerTick from './spinnerTick';

describe('generateSpinnerTick', () => {
  const spinnerTick = generateSpinnerTick();

  it('generates component correctly', () => {
    expect(spinnerTick).toMatchSnapshot();
  });
});
