import ModalComponent from './components/modal';
import SpinnerComponent from './components/spinner';
import { getSearchParams, updateSearchParams } from './util/searchParamHelper';
import './style.css';
import generateListComponent from './components/list';

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

const spinner = new SpinnerComponent(listEntries, handleChanges, spinnerCallback);
changeHandler.push(() => spinner.render());

document.querySelector('#list-container')?.appendChild(generateListComponent({
  newElementCallback: (newElement: string) => {
    listEntries.push(newElement);
    handleChanges();
  },
  initialElements: listEntries,
}));

const initializeSpinner = () => {
  spinner.render();
};

initializeSpinner();
