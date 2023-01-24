import {
  describe, expect, it, vi,
} from 'vitest';
import generateListEntry from './listEntry';

describe('generateListEntry', () => {
  const listEntry = generateListEntry({
    label: 'Test',
    isDone: false,
  });

  it('generates component correctly', () => {
    expect(listEntry).toMatchSnapshot();
  });

  it('adds isDone changes', () => {
    const doneEntry = generateListEntry({
      label: 'Test',
      isDone: true,
    });

    expect(doneEntry).toMatchSnapshot();
  });
});
