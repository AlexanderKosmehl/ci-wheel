import './global.css';

import { getSearchParams } from './util/searchParamHelper';
import { updateSpinnerLabels } from './controller/spinnerController';
import updateList from './controller/sidebarController';

const listEntries: string[] = getSearchParams() || [];

updateList(listEntries);
updateSpinnerLabels(listEntries);
