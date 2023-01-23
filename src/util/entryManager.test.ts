import { describe, expect, it } from 'vitest';
import {
  addEntries, addEntry, getCurrentEntries, initEntryManager,
  removeEntry, toggleIsDone, updateCurrentEntries,
} from './entryManager';

describe('entryManager', () => {
  initEntryManager();

  it('begins empty', () => {
    expect(getCurrentEntries().length).toBe(0);
  });

  it('can add one new entry', () => {
    addEntry('Test');
    expect(getCurrentEntries().length).toBe(1);
  });

  it('can add multiple new entries', () => {
    addEntries(['Test 2', 'Test 3']);
    expect(getCurrentEntries().length).toBe(3);
  });

  it('can remove an entry by string', () => {
    removeEntry('Test');
    expect(getCurrentEntries().length).toBe(2);
    expect(getCurrentEntries().find((entry) => entry.name === 'Test')).toBeUndefined();
  });

  it('can toggle the isDone state of an entry', () => {
    expect(getCurrentEntries().find((entry) => entry.name === 'Test 2')?.isDone).toBe(false);
    toggleIsDone('Test 2');
    expect(getCurrentEntries().find((entry) => entry.name === 'Test 2')?.isDone).toBe(true);
    toggleIsDone('Test 2');
    expect(getCurrentEntries().find((entry) => entry.name === 'Test 2')?.isDone).toBe(false);
  });

  it('can update all stored entries', () => {
    updateCurrentEntries(['Test 4', 'Test 5']);
    expect(getCurrentEntries().length).toBe(2);
    expect(getCurrentEntries().map((entry) => entry.name)).toEqual(['Test 4', 'Test 5']);
  });
});
