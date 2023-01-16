import {
  describe, expect, it, vi,
} from 'vitest';
import generateListEntry from './listEntry';

describe('generateListEntry', () => {
  const onDelete = vi.fn(() => {});

  const listEntry = generateListEntry({
    label: 'Test',
    onDelete,
  });
  const deleteButton = listEntry.querySelector<HTMLButtonElement>('[data-test=listEntryDeleteButton]');

  it('generates component correctly', () => {
    expect(listEntry).toMatchSnapshot();
  });

  it('adds working callback', () => {
    if (!deleteButton) throw Error('No Button rendered!');

    deleteButton.click();

    expect(onDelete).toBeCalled();
  });
});
