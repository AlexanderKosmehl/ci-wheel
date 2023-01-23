import {
  describe, expect, it, vi,
} from 'vitest';
import { getCurrentEntries } from '../../../util/entryManager';
import generateInputBar from './inputBar';

describe('generateButton', () => {
  const inputBar = generateInputBar();
  const inputField = inputBar.querySelector<HTMLInputElement>('[data-test=sidebarInput]');
  const inputButton = inputBar.querySelector<HTMLButtonElement>('[data-test=sidebarInputButton]');

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
    expect(getCurrentEntries()).toEqual([{ name: 'test', isDone: false }]);
  });
});
