import ListComponent from './components/list';
import SpinnerComponent from './components/spinner';
import { getSearchParams, updateSearchParams } from './components/util/searchParamHelper';
import './style.css';

const listEntries: string[] = getSearchParams() || [];

const changeHandler: (() => void)[] = [];

const handleChanges = () => {
  changeHandler.forEach((handler) => handler());
};
changeHandler.push(() => { updateSearchParams(listEntries); });

const spinnerCallback = (selectedLabel: string) => {
  console.log(selectedLabel);
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
