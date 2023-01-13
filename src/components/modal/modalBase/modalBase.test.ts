import {
  describe, expect, it, vi,
} from 'vitest';
import generateModal from './modalBase';

describe('generateModal', () => {
  const content = document.createElement<'div'>('div');
  content.textContent = 'Content';

  const onClose = vi.fn(() => {});

  const modal = generateModal({
    title: 'Title',
    content,
    onClose,
  });

  const closeButton = modal.querySelector<HTMLButtonElement>('.closeButton');

  it('generates component correctly', () => {
    expect(modal).toMatchSnapshot();
  });

  it('adds working onClose callback', () => {
    if (!closeButton) throw Error('No closeButton rendered!');

    closeButton.click();
    expect(onClose).toBeCalled();
  });
});
