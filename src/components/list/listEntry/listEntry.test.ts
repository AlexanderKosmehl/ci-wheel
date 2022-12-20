import {
  describe, expect, it, jest,
} from '@jest/globals';
import generateListEntry from './listEntry';

describe('generateListEntry', () => {
  const onDelete = jest.fn(() => {});

  const listEntry = generateListEntry({
    label: 'Test',
    onDelete,
  });
  const deleteButton = listEntry.querySelector<HTMLButtonElement>('li > button');

  it('generates component correctly', () => {
    expect(listEntry).toMatchSnapshot();
  });

  it('adds working callback', () => {
    if (!deleteButton) throw Error('No Button rendered!');

    deleteButton.click();

    expect(onDelete).toBeCalled();
  });
});
