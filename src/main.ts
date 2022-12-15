import ListComponent from './components/list';
import ModalComponent from './components/modal';
import SpinnerComponent from './components/spinner';
import { getSearchParams, updateSearchParams } from './util/searchParamHelper';
import './style.css';

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

const list = new ListComponent(listEntries, handleChanges);
changeHandler.push(() => list.render());

const initializeSpinner = () => {
  spinner.render();
  list.render();
};

initializeSpinner();
