import ListComponent from './components/list';
import SpinnerComponent from './components/wheel';
import './style.css';

const urlSearchParams = new URLSearchParams(window.location.search);
const listEntries: string[] = urlSearchParams.get('entries')?.split(',') || [];

const changeHandler: (() => void)[] = [];

const handleChanges = () => {
  changeHandler.forEach((handler) => handler());
};

const spinner = new SpinnerComponent(listEntries, handleChanges);
changeHandler.push(() => spinner.renderWheel());

const list = new ListComponent(listEntries, handleChanges);
changeHandler.push(() => list.renderList());
