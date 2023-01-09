import {
  describe, expect, it, jest,
} from '@jest/globals';
import generateArchiveModal from './archiveModal';

describe('generateArchiveModal', () => {
  const onClose = jest.fn(() => {});
  const updateCallback = jest.fn((_updatedEntries: string[]) => {});

  const modal = generateArchiveModal({
    onClose,
    currentEntries: ['Test 1', 'Test 2'],
    updateCurrentEntries: updateCallback,
  });

  it('generates component correctly', () => {
    expect(modal).toMatchSnapshot();
  });
});
