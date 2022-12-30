import generateSpinnerComponent from '../components/spinner/spinnerContainer/spinnerContainer';
import { openSpinResultModal } from './modalController';

const spinnerContainer = document.querySelector('#spinner-container');

let labels: string[] = [];

function deleteSpinner() {
  if (!spinnerContainer) return;

  spinnerContainer.textContent = '';
}

function updateSpinner() {
  if (!spinnerContainer) return;

  deleteSpinner();

  spinnerContainer.appendChild(
    generateSpinnerComponent({
      labels,
      spinCallback: openSpinResultModal,
    }),
  );
}

export function updateSpinnerLabels(newLabels: string[]) {
  labels = [...newLabels];
  updateSpinner();
}

export function removeLabelFromSpinner(label: string) {
  labels = labels.filter((existingLabel) => existingLabel !== label);
  updateSpinner();
}
