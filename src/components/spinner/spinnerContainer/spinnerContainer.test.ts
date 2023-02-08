import {
  beforeEach,
  describe, expect, it, vi,
} from 'vitest';
import {
  addEntries, getCurrentEntries, initEntryManager, removeEntry, toggleIsDone,
} from '../../../util/entryManager';
import generateSpinnerContainer from './spinnerContainer';

describe('generateSpinnerComponent', () => {
  beforeEach(() => {
    // Clear all entries
    getCurrentEntries().forEach((entry) => {
      removeEntry(entry.name);
    });
  });

  const spinnerComponent = generateSpinnerContainer();

  it('generates placeholder correctly', () => {
    initEntryManager();

    expect(spinnerComponent).toMatchSnapshot();
  });

  it('generates component correctly', () => {
    addEntries(['Test', 'Test2']);

    expect(spinnerComponent).toMatchSnapshot();
  });

  it('correctly displays restart helper', () => {
    addEntries(['Test']);
    toggleIsDone('Test');

    expect(spinnerComponent).toMatchSnapshot();
  });
});
