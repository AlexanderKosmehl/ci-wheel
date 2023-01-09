import {
  describe, expect, it, jest,
} from '@jest/globals';
import generateSpinnerButton from './spinnerButton';

describe('generateSpinnerButton', () => {
  const onClick = jest.fn(() => {});
  const buttonComponent = generateSpinnerButton({ onClick });

  it('generates component correctly', () => {
    expect(buttonComponent).toMatchSnapshot();
  });

  it('adds working clickListener', () => {
    buttonComponent.click();

    expect(onClick).toBeCalled();
  });
});
