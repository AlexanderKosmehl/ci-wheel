import {
  describe, expect, it, jest,
} from '@jest/globals';
import { SPIN_DURATION_IN_SEC } from '../../../config';
import generateSpinner from './spinner';

describe('generateSpinner', () => {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const spinCallback = jest.fn((_result: string) => {});
  const labels = ['Test', 'Test2'];

  const spinner = generateSpinner({
    labels,
    spinCallback,
  });

  // Callback is called after a delay
  jest.useFakeTimers();

  it('generates component correctly', () => {
    expect(spinner).toMatchSnapshot();
  });

  it('adds working callback', () => {
    spinner.click();

    jest.advanceTimersByTime(SPIN_DURATION_IN_SEC * 1000);

    expect(spinCallback.mock.calls.length).toBe(1);
    expect(labels.includes(spinCallback.mock.calls[0][0])).toBe(true);
  });
});
