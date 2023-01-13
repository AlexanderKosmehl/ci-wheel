import {
  describe, expect, it, vi,
} from 'vitest';
import generateTextInput from './textInput';

describe('generateButton', () => {
  const onKeyPress = vi.fn((_event: KeyboardEvent) => {});

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
