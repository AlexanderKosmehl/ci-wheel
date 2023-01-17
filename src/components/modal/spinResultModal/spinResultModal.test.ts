import {
  describe, expect, it, vi,
} from 'vitest';
import generateModal from './spinResultModal';

describe('generateModal', () => {
  const onCloseCallback = vi.fn(() => {});

  const modal = generateModal({
    label: 'Test',
    onClose: onCloseCallback,
  });
  const closeButton = modal.querySelector<HTMLButtonElement>('[data-test=modalCloseButton]');

  it('generates component correctly', () => {
    expect(modal).toMatchSnapshot();
  });

  it('adds working onClose callback', () => {
    if (!closeButton) throw Error('No closeButton rendered!');

    closeButton.click();
    expect(onCloseCallback).toBeCalled();
  });
});
