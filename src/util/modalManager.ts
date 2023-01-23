import generateArchiveModal from '../components/modal/archiveModal/archiveModal';
import generateImportModal from '../components/modal/importModal/importModal';
import generateSpinResultModal from '../components/modal/spinResultModal/spinResultModal';
import {
  addEntries, getCurrentEntries, toggleIsDone, updateCurrentEntries,
} from './entryManager';

let modalContainer: HTMLDivElement | undefined;

export function initModalManager() {
  const newContainerRef = document.querySelector<HTMLDivElement>('#modal-container');

  if (!newContainerRef) throw Error('No ModalContainer found!');

  modalContainer = newContainerRef;
}

const closeModal = () => {
  if (!modalContainer) return;

  modalContainer.textContent = '';
};

export function openSpinResultModal(resultLabel: string) {
  if (!modalContainer) return;

  closeModal();

  modalContainer.appendChild(
    generateSpinResultModal({
      label: resultLabel,
      onClose: () => {
        toggleIsDone(resultLabel);
        closeModal();
      },
    }),
  );
}

export function openImportModal() {
  if (!modalContainer) return;

  closeModal();

  modalContainer.appendChild(
    generateImportModal({
      onClose: closeModal,
      onImport: (importText: string) => {
        const importedEntries = importText
          .split('\n')
          .map((entry) => entry.trim())
          .filter((entry) => entry !== '');

        addEntries(importedEntries);
        closeModal();
      },
    }),
  );
}

export function openArchiveModal() {
  if (!modalContainer) return;

  closeModal();

  modalContainer.appendChild(
    generateArchiveModal({
      onClose: closeModal,
      currentEntries: getCurrentEntries().map((entry) => entry.name),
      updateCurrentEntries,
    }),
  );
}
