import { describe, expect, it } from 'vitest';
import { getArchiveEntries, updateArchiveEntries } from './archiveHelper';

describe('archiveHelper', () => {
  it('starts empty', () => {
    expect(getArchiveEntries()).toEqual([]);
  });

  it('adds new entries', () => {
    const newEntries = ['Test 1', 'Test 2'];
    updateArchiveEntries(newEntries);

    expect(getArchiveEntries()).toEqual(newEntries);
  });
});
