import './style.css';
import { getSearchParams } from './util/searchParamHelper';
import generateListComponent from './components/list';
import generateSpinnerComponent from './components/spinnerContainer';
import generateModal from './components/modal';

let listEntries: string[] = getSearchParams() || [];

const updateHandler: (() => void)[] = [];
function handleUpdates() {
  updateHandler.forEach((handler) => handler());
}

const spinCallback = (selectedLabel: string) => {
  const modalContainer = document.querySelector('#modal-container');
  if (!modalContainer) return;

  modalContainer.appendChild(generateModal({
    label: selectedLabel,
    onClose: () => {
      modalContainer.textContent = '';
    },
    onDelete: () => {
      const selectedElementIndex = listEntries.findIndex((entry) => entry === selectedLabel);
      listEntries.splice(selectedElementIndex, 1);
      handleUpdates();
      modalContainer.textContent = '';
    },
  }));
};

const { newSpinnerContainer, updateSpinner } = generateSpinnerComponent({
  initialLabels: getSearchParams() || [],
  spinCallback,
});
updateHandler.push(() => updateSpinner(listEntries));

document.querySelector('#spinner-container')?.appendChild(newSpinnerContainer);

document.querySelector('#list-container')?.appendChild(generateListComponent({
  listChangeCallback: (updatedList: string[]) => {
    listEntries = updatedList;
    updateSpinner(listEntries);
  },
  initialElements: listEntries,
}));
