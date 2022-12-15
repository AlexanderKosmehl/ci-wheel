import ModalComponent from './components/modal';
import { getSearchParams, updateSearchParams } from './util/searchParamHelper';
import './style.css';
import generateListComponent from './components/list';
import generateSpinnerComponent from './components/spinnerContainer';

const listEntries: string[] = getSearchParams() || [];

const changeHandler: (() => void)[] = [];

const handleChanges = () => {
  changeHandler.forEach((handler) => handler());
};
changeHandler.push(() => { updateSearchParams(listEntries); });

const modal = new ModalComponent();

const spinnerCallback = (selectedLabel: string) => {
  modal.show(selectedLabel, () => {
    const selectedElementIndex = listEntries.findIndex((entry) => entry === selectedLabel);
    listEntries.splice(selectedElementIndex, 1);
    handleChanges();
  });
};

const { newSpinnerContainer, updateSpinner } = generateSpinnerComponent({
  initialLabels: getSearchParams() || [],
  spinCallback: spinnerCallback,
});
changeHandler.push(() => updateSpinner(listEntries));

document.querySelector('#spinner-container')?.appendChild(newSpinnerContainer);

document.querySelector('#list-container')?.appendChild(generateListComponent({
  newElementCallback: (newElement: string) => {
    listEntries.push(newElement);
    handleChanges();
  },
  initialElements: listEntries,
}));
