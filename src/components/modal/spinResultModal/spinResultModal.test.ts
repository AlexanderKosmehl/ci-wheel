import {
  describe, expect, it, jest,
} from '@jest/globals';
import generateModal from './spinResultModal';

describe('generateModal', () => {
  const onCloseCallback = jest.fn(() => {});
  const onDeleteCallback = jest.fn(() => {});

  const modal = generateModal({
    label: 'Test',
    onClose: onCloseCallback,
    onDelete: onDeleteCallback,
  });
  const closeButton = modal.querySelector<HTMLButtonElement>('.closeButton');
  const deleteButton = modal.querySelector<HTMLButtonElement>('.deleteButton');

  it('generates component correctly', () => {
    expect(modal).toMatchSnapshot();
  });

  it('adds working onClose callback', () => {
    if (!closeButton) throw Error('No closeButton rendered!');

    closeButton.click();
    expect(onCloseCallback).toBeCalled();
  });

  it('adds working onDelete callback', () => {
    if (!deleteButton) throw Error('No deleteButton rendered!');

    deleteButton.click();
    expect(onDeleteCallback).toBeCalled();
  });
});
