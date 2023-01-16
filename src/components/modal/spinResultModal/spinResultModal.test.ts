import {
  describe, expect, it, vi,
} from 'vitest';
import generateModal from './spinResultModal';

describe('generateModal', () => {
  const onCloseCallback = vi.fn(() => {});
  const onDeleteCallback = vi.fn(() => {});

  const modal = generateModal({
    label: 'Test',
    onClose: onCloseCallback,
    onDelete: onDeleteCallback,
  });
  const closeButton = modal.querySelector<HTMLButtonElement>('[data-test=modalCloseButton]');
  const doneButton = modal.querySelector<HTMLButtonElement>('[data-test=modalDoneButton]');

  it('generates component correctly', () => {
    expect(modal).toMatchSnapshot();
  });

  it('adds working onClose callback', () => {
    if (!closeButton) throw Error('No closeButton rendered!');

    closeButton.click();
    expect(onCloseCallback).toBeCalled();
  });

  it('adds working onDelete callback', () => {
    if (!doneButton) throw Error('No doneButton rendered!');

    doneButton.click();
    expect(onDeleteCallback).toBeCalled();
  });
});
