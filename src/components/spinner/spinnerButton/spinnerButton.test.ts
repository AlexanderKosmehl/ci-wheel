import {
  describe, expect, it, vi,
} from 'vitest';
import generateSpinnerButton from './spinnerButton';

describe('generateSpinnerButton', () => {
  const onClick = vi.fn(() => {});
  const buttonComponent = generateSpinnerButton({ onClick });

  it('generates component correctly', () => {
    expect(buttonComponent).toMatchSnapshot();
  });

  it('adds working clickListener', () => {
    buttonComponent.click();

    expect(onClick).toBeCalled();
  });
});
