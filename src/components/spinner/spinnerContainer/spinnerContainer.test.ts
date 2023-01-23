import {
  describe, expect, it,
} from 'vitest';
import { addEntries } from '../../../util/entryManager';
import generateSpinnerComponent from './spinnerContainer';

describe('generateSpinnerComponent', () => {
  const spinnerComponent = generateSpinnerComponent();
  addEntries(['Test', 'Test2']);

  it('generates component correctly', () => {
    expect(spinnerComponent).toMatchSnapshot();
  });
});
