import {
  describe, expect, it, jest,
} from '@jest/globals';
import generateInputBar from './inputBar';

describe('generateButton', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const newElementCallback = jest.fn((_newElement: string) => {});

  const inputBar = generateInputBar({
    newElementCallback,
  });
  const inputField = inputBar.querySelector<HTMLInputElement>('div > input');
  const inputButton = inputBar.querySelector<HTMLButtonElement>('div > button');

  it('generates component correctly', () => {
    expect(inputBar).toMatchSnapshot();
  });

  it('adds working callback', () => {
    if (!inputField || !inputButton) throw Error('Missing Inputs!');

    inputField.value = 'Test';
    inputField.dispatchEvent(new Event('keyup'));
    inputButton.click();

    expect(inputField.textContent).toBe('');
    expect(newElementCallback.mock.calls.length).toBe(1);
    expect(newElementCallback.mock.calls[0][0]).toBe('Test');
  });
});
