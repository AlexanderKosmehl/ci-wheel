import {
  describe, expect, it,
} from 'vitest';
import { addEntries } from '../../../util/entryManager';
import generateList from './list';

describe('generateListComponent', () => {
  const listComponent = generateList();
  addEntries(['Test', 'Test2']);

  it('generates component correctly', () => {
    expect(listComponent).toMatchSnapshot();
  });

  it('removes entries correctly', () => {
    const listElement = listComponent.querySelector<HTMLLIElement>('li');

    if (!listElement) throw Error('No list entries rendered!');

    listElement.querySelector<HTMLButtonElement>('[data-test=listEntryDeleteButton]')?.click();

    const remainingEntries = listComponent.querySelectorAll<HTMLSpanElement>('[data-test=listEntryLabel]');
    expect(remainingEntries.length).toBe(1);
  });
});
