import {
  describe, expect, it, vi,
} from 'vitest';
import { SPIN_DURATION_IN_SEC } from '../../../config';
import generateSpinnerComponent from './spinnerContainer';

describe('generateSpinnerComponent', () => {
  const spinCallback = vi.fn((_result: string) => {});
  const labels = ['Test', 'Test2'];

  const spinnerComponent = generateSpinnerComponent({
    labels,
    spinCallback,
  });

  // Callback is called after a delay
  vi.useFakeTimers();

  it('generates component correctly', () => {
    expect(spinnerComponent).toMatchSnapshot();
  });

  it('adds working callback', () => {
    const button = spinnerComponent.querySelector<HTMLButtonElement>('[data-test=spinnerButton]');
    if (!button) throw Error('No button rendered!');

    button.click();

    vi.advanceTimersByTime(SPIN_DURATION_IN_SEC * 1000);

    expect(spinCallback).toBeCalled();
    expect(labels).toContain(spinCallback.mock.calls[0][0]);
  });
});
