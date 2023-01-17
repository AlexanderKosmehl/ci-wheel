import generateArchiveModal from '../archiveModal/archiveModal';
import generateImportModal from '../importModal/importModal';
import generateSpinResultModal from '../spinResultModal/spinResultModal';

export default function generateModalContainer() {
  const modalContainer = document.createElement<'div'>('div');

  const closeModal = () => {
    modalContainer.textContent = '';
  };

  function openSpinResultModal(
    resultLabel: string,
    removalCallback: () => void,
  ) {
    closeModal();

    modalContainer.appendChild(
      generateSpinResultModal({
        label: resultLabel,
        onClose: () => {
          removalCallback();
          closeModal();
        },
      }),
    );
  }

  function openImportModal(
    importCallback: (importedEntries: string[]) => void,
  ) {
    closeModal();

    modalContainer.appendChild(
      generateImportModal({
        onClose: closeModal,
        onImport: (importText: string) => {
          const importedEntries = importText
            .split('\n')
            .map((entry) => entry.trim())
            .filter((entry) => entry !== '');

          importCallback(importedEntries);
          closeModal();
        },
      }),
    );
  }

  function openArchiveModal(
    currentEntries: string[],
    updateCurrentEntries: (updatedEntries: string[]) => void,
  ) {
    closeModal();

    modalContainer.appendChild(
      generateArchiveModal({
        onClose: closeModal,
        currentEntries,
        updateCurrentEntries,
      }),
    );
  }

  return {
    modalContainer,
    openSpinResultModal,
    openImportModal,
    openArchiveModal,
  };
}
