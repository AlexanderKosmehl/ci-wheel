import generateSpinResultModal from '../components/modal/spinResultModal/spinResultModal';
// eslint-disable-next-line import/no-cycle
import { removeLabelFromSpinner } from './spinnerController';

const modalContainer = document.querySelector('#modal-container');

function closeModal() {
  if (!modalContainer) return;

  modalContainer.textContent = '';
}

export function openSpinResultModal(resultLabel: string) {
  if (!modalContainer) return;

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

export function openTextEditModal() {}

export function openArchiveModal() {}
