import {
  describe, expect, it, vi,
} from 'vitest';
import generateListComponent from './listComponent';

describe('generateListComponent', () => {
  const entryRemovalCallback = vi.fn((_removedEntry: string) => {});
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

    listElement.querySelector<HTMLButtonElement>('[data-test=listEntryDeleteButton]')?.click();
    expect(entryRemovalCallback).toBeCalled();
    expect(entryRemovalCallback).toBeCalledWith('Test');
  });
});
