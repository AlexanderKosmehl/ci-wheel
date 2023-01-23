import {
  describe, expect, it,
} from 'vitest';
import { addEntries } from '../../util/entryManager';
import generateSidebar from './sidebar';

describe('generateSidebar', () => {
  const sidebar = generateSidebar();
  addEntries(['Test 1', 'Test 2']);

  it('generates component correctly', () => {
    expect(sidebar).toMatchSnapshot();
  });

  it('adds new entries correctly', () => {
    const input = sidebar.querySelector<HTMLInputElement>('[data-test=sidebarInput]');
    const inputButton = sidebar.querySelector<HTMLButtonElement>('[data-test=sidebarInputButton]');

    if (!input || !inputButton) throw Error('Input not rendered correctly!');

    const newEntry = 'Test 3';
    input.value = newEntry;
    input.dispatchEvent(new Event('keyup'));

    inputButton.click();

    const entries = sidebar.querySelectorAll<HTMLSpanElement>('[data-test=listEntryLabel]');
    expect(entries.length).toBe(3);
  });
});
