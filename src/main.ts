import generateListComponent from './components/list/listComponent/listComponent';
import generateModal from './components/modal/spinResultModal/spinResultModal';
import generateSpinnerComponent from './components/spinner/spinnerContainer/spinnerContainer';
import './global.css';
import { getSearchParams } from './util/searchParamHelper';

const spinnerContainer = document.querySelector('#spinner-container');
const listContainer = document.querySelector('#list-container');
const modalContainer = document.querySelector('#modal-container');

let listEntries: string[] = getSearchParams() || [];

let updateSpinner: (labels: string[]) => void;

function spinCallback(selectedLabel: string) {
  if (!modalContainer) return;

  modalContainer.appendChild(
    generateModal({
      label: selectedLabel,
      onClose: () => {
        modalContainer.textContent = '';
      },
      onDelete: () => {
        const selectedElementIndex = listEntries.findIndex((entry) => entry === selectedLabel);
        listEntries.splice(selectedElementIndex, 1);
        modalContainer.textContent = '';
        if (updateSpinner) updateSpinner(listEntries);
      },
    }),
  );
}

updateSpinner = (labels: string[]) => {
  if (!spinnerContainer) return;

  spinnerContainer.textContent = '';
  spinnerContainer.appendChild(
    generateSpinnerComponent({
      labels,
      spinCallback,
    }),
  );
};
updateSpinner(listEntries);

listContainer?.appendChild(
  generateListComponent({
    listChangeCallback: (updatedList: string[]) => {
      listEntries = updatedList;
      updateSpinner(listEntries);
    },
    initialElements: listEntries,
  }),
);
