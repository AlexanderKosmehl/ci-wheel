import {
  describe, expect, it, jest,
} from '@jest/globals';
import generateListComponent from './listComponent';

describe('generateListComponent', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const listChangeCallback = jest.fn((_updatedList: string[]) => {});
  const initialElements = ['Test', 'Test2'];

  const listComponent = generateListComponent({
    initialElements,
    listChangeCallback,
  });

  const inputField = listComponent.querySelector<HTMLInputElement>('div > div > input');
  const inputButton = listComponent.querySelector<HTMLButtonElement>('div > div > button');

  it('generates component correctly', () => {
    expect(listComponent).toMatchSnapshot();
  });

  it('adds working callback', () => {
    if (!inputField || !inputButton) throw Error('Missing Inputs!');

    inputField.value = 'Test3';
    inputField.dispatchEvent(new Event('keyup'));
    inputButton.click();

    expect(listChangeCallback.mock.calls.length).toBe(1);
    expect(listChangeCallback.mock.calls[0][0]).toEqual([...initialElements, 'Test3']);
  });
});
