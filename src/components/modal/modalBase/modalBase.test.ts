import {
  describe, expect, it, jest,
} from '@jest/globals';
import generateModal from './modalBase';

describe('generateModal', () => {
  const content = document.createElement<'div'>('div');
  content.textContent = 'Content';

  const onClose = jest.fn(() => {});

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
