import { describe, expect, it } from 'vitest';
import {
  initModalManager, openArchiveModal, openImportModal, openSpinResultModal,
} from './modalManager';

describe('modalManager', () => {
  const modalContainer = document.createElement<'div'>('div');
  modalContainer.id = 'modal-container';
  document.body.appendChild(modalContainer);

  initModalManager();

  it('can open the spinResult modal', () => {
    openSpinResultModal('Test');
    expect(modalContainer).toMatchSnapshot();
  });

  it('can open the import modal', () => {
    openImportModal();
    expect(modalContainer).toMatchSnapshot();
  });

  it('can open the archive modal', () => {
    openArchiveModal();
    expect(modalContainer).toMatchSnapshot();
  });
});
