import {
  describe, expect, it, jest,
} from '@jest/globals';
import { SPIN_DURATION_IN_SEC } from '../../../config';
import generateSpinnerComponent from './spinnerContainer';

describe('generateSpinnerComponent', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const spinCallback = jest.fn((_result: string) => {});
  const labels = ['Test', 'Test2'];

  const spinnerComponent = generateSpinnerComponent({
    labels,
    spinCallback,
  });
  const spinner = spinnerComponent.querySelector<HTMLDivElement>('.spinner');

  // Callback is called after a delay
  jest.useFakeTimers();

  it('generates component correctly', () => {
    expect(spinnerComponent).toMatchSnapshot();
  });

  it('adds working callback', () => {
    if (!spinner) throw Error('No spinner rendered!');

    spinner.click();

    jest.advanceTimersByTime(SPIN_DURATION_IN_SEC * 1000);

    expect(spinCallback).toBeCalled();
    expect(labels).toContain(spinCallback.mock.calls[0][0]);
  });
});
