import {
  describe, expect, it, vi, beforeEach,
} from 'vitest';
import generateModal from './modalBase';

describe('generateModal', () => {
  const content = document.createElement<'div'>('div');
  content.textContent = 'Content';

  let onClose: () => void;

  let modal: HTMLDivElement;

  beforeEach(() => {
    onClose = vi.fn(() => {});

    modal = generateModal({
      title: 'Title',
      content,
      onClose,
    });
  });

  it('generates component correctly', () => {
    expect(modal).toMatchSnapshot();
  });

  it('adds working onClose callback', () => {
    const closeButton = modal.querySelector<HTMLButtonElement>('[data-test=modalCloseButton]');
    if (!closeButton) throw Error('No closeButton rendered!');

    expect(onClose).not.toBeCalled();
    closeButton.click();
    expect(onClose).toBeCalled();
  });

  it('adds onClose callback to Esc-Key', () => {
    const keyEvent = new KeyboardEvent('keydown', { key: 'Escape' });

    expect(onClose).not.toBeCalled();
    window.dispatchEvent(keyEvent);
    expect(onClose).toBeCalled();
  });

  it('adds onClose callback to modal background', () => {
    const clickEvent = new MouseEvent('click');

    expect(onClose).not.toBeCalled();
    modal.dispatchEvent(clickEvent);
    expect(onClose).toBeCalled();
  });
});
