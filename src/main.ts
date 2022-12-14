import ListComponent from './components/list';
import SpinnerComponent from './components/spinner';
import './style.css';

const urlSearchParams = new URLSearchParams(window.location.search);
const listEntries: string[] = urlSearchParams.get('entries')?.split(',') || [];

const changeHandler: (() => void)[] = [];

const handleChanges = () => {
  changeHandler.forEach((handler) => handler());
};

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
