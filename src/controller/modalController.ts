import generateArchiveModal from '../components/modal/archiveModal/archiveModal';
import generateImportModal from '../components/modal/importModal/importModal';
import generateSpinResultModal from '../components/modal/spinResultModal/spinResultModal';
import { getSearchParams, updateSearchParams } from '../util/searchParamHelper';
// eslint-disable-next-line import/no-cycle
import { updateList } from './sidebarController';
// eslint-disable-next-line import/no-cycle
import { removeLabelFromSpinner, updateSpinnerLabels } from './spinnerController';

const modalContainer = document.querySelector('#modal-container');

function closeModal() {
  if (!modalContainer) return;

  modalContainer.textContent = '';
}

export function openSpinResultModal(resultLabel: string) {
  if (!modalContainer) return;

  closeModal();

  modalContainer.appendChild(
    generateSpinResultModal({
      label: resultLabel,
      onClose: closeModal,
      onDelete: () => {
        removeLabelFromSpinner(resultLabel);
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
          .map((entry) => entry.trim());

        const updatedEntries = [...getSearchParams(), ...importedEntries];

        updateSearchParams(updatedEntries);
        updateSpinnerLabels(updatedEntries);
        updateList(updatedEntries);

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
    }),
  );
}
