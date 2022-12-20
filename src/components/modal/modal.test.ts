import {
  describe, expect, it, jest,
} from '@jest/globals';
import generateModal from './modal';

describe('generateModal', () => {
  const onCloseCallback = jest.fn(() => {});
  const onDeleteCallback = jest.fn(() => {});

  const modal = generateModal({
    label: 'Test',
    onClose: onCloseCallback,
    onDelete: onDeleteCallback,
  });
  const closeButton = modal.querySelector<HTMLButtonElement>('.closeIcon');
  const deleteButton = modal.querySelector<HTMLButtonElement>('.deleteIcon');

  it('generates component correctly', () => {
    expect(modal).toMatchSnapshot();
  });

  it('adds working onClose callback', () => {
    if (!closeButton) throw Error('No closeButton rendered!');

    closeButton.click();
    expect(onCloseCallback.mock.calls.length).toBe(1);
  });

  it('adds working onDelete callback', () => {
    if (!deleteButton) throw Error('No deleteButton rendered!');

    deleteButton.click();
    expect(onDeleteCallback.mock.calls.length).toBe(1);
  });
});
