import {
  describe, expect, it, vi,
} from 'vitest';
import generateArchiveModal from './archiveModal';

describe('generateArchiveModal', () => {
  const onClose = vi.fn(() => {});
  const updateCallback = vi.fn((_updatedEntries: string[]) => {});

  const modal = generateArchiveModal({
    onClose,
    currentEntries: ['Test 1', 'Test 2'],
    updateCurrentEntries: updateCallback,
  });

  it('generates component correctly', () => {
    expect(modal).toMatchSnapshot();
  });
});
