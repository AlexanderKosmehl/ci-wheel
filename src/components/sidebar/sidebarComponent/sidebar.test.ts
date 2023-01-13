import {
  describe, expect, it, vi,
} from 'vitest';
import generateSidebar from './sidebar';

describe('generateSidebar', () => {
  const listChangeCallback = vi.fn((_updatedEntries: string[]) => {});
  const openImportCallback = vi.fn(() => {});
  const openArchiveCallback = vi.fn(() => {});
  const listEntries = ['Test 1', 'Test 2'];

  const sidebar = generateSidebar({
    listEntries,
    listChangeCallback,
    openImportModal: openImportCallback,
    openArchiveModal: openArchiveCallback,
  });

  const buttons = Array.from(sidebar.querySelectorAll('button'));

  it('generates component correctly', () => {
    expect(sidebar).toMatchSnapshot();
  });

  it('adds new entries correctly', () => {
    const input = sidebar.querySelector<HTMLInputElement>('input');
    const inputButton = sidebar.querySelector<HTMLButtonElement>('.addButton');

    if (!input || !inputButton) throw Error('Input not rendered correctly!');

    const newEntry = 'Test 3';
    input.value = newEntry;
    input.dispatchEvent(new Event('keyup'));

    inputButton.click();

    expect(listChangeCallback).toBeCalled();
    expect(listChangeCallback).toBeCalledWith([newEntry, ...listEntries]);
  });

  it('binds import callback correctly', () => {
    const importButton = buttons.find((button) => button.textContent === 'Import');

    if (!importButton) throw Error('No input button found!');

    importButton.click();
    expect(openImportCallback).toBeCalled();
  });

  it('binds archive callback correctly', () => {
    const archiveButton = buttons.find((button) => button.textContent === 'Archiv');

    if (!archiveButton) throw Error('No archive button found!');

    archiveButton.click();
    expect(openArchiveCallback).toBeCalled();
  });
});
