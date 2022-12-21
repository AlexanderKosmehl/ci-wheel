import {
  describe, expect, it, jest,
} from '@jest/globals';
import generateSpinnerButton from './spinnerButton';

describe('generateSpinnerButton', () => {
  const onClick = jest.fn(() => {});
  const buttonComponent = generateSpinnerButton({ onClick });

  const button = buttonComponent.querySelector<HTMLButtonElement>('div > button');

  it('generates component correctly', () => {
    expect(buttonComponent).toMatchSnapshot();
  });

  it('adds working clickListener', () => {
    if (!button) throw Error('No button rendered!');

    button.click();

    expect(onClick).toBeCalled();
  });
});
