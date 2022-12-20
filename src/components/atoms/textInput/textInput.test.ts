import {
  describe, expect, it, jest,
} from '@jest/globals';
import generateTextInput from './textInput';

describe('generateButton', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onKeyPress = jest.fn((_event: KeyboardEvent) => {});

  const inputBar = generateTextInput({
    classes: ['class', 'class2'],
    placeholder: 'Placeholder',
    onKeyPress,
  });

  it('generates component correctly', () => {
    expect(inputBar).toMatchSnapshot();
  });

  it('adds working callback', () => {
    inputBar.value = 'Test';
    inputBar.dispatchEvent(new Event('keyup'));

    expect(onKeyPress).toBeCalled();
  });
});
