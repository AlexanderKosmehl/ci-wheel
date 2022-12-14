import {
  describe, expect, it, jest,
} from '@jest/globals';
import generateListComponent from './listComponent';

describe('generateListComponent', () => {
  const entryRemovalCallback = jest.fn((_removedEntry: string) => {});
  const listEntries = ['Test', 'Test2'];

  const listComponent = generateListComponent({
    listEntries,
    entryRemovalCallback,
  });

  it('generates component correctly', () => {
    expect(listComponent).toMatchSnapshot();
  });

  it('adds working removal callback', () => {
    const listElement = listComponent.querySelector<HTMLLIElement>('li');

    if (!listElement) throw Error('No list entries rendered!');

    listElement.querySelector<HTMLButtonElement>('.deleteButton')?.click();
    expect(entryRemovalCallback).toBeCalled();
    expect(entryRemovalCallback).toBeCalledWith('Test');
  });
});
