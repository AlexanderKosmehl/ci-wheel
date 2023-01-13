import {
  describe, expect, it, vi,
} from 'vitest';
import generateInputBar from './inputBar';

describe('generateButton', () => {
  const newElementCallback = vi.fn((_newElement: string) => {});

  const inputBar = generateInputBar({
    newEntryCallback: newElementCallback,
  });
  const inputField = inputBar.querySelector<HTMLInputElement>('div > input');
  const inputButton = inputBar.querySelector<HTMLButtonElement>('div > button');

  it('generates component correctly', () => {
    expect(inputBar).toMatchSnapshot();
  });

  it('adds working callback', () => {
    if (!inputField || !inputButton) throw Error('Missing Inputs!');

    const testValue = 'test';

    inputField.value = testValue;
    inputField.dispatchEvent(new Event('keyup'));
    inputButton.click();

    expect(inputField.textContent).toBe('');
    expect(newElementCallback).toBeCalled();
    expect(newElementCallback).toBeCalledWith(testValue);
  });
});
