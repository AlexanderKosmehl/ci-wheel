import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';
import './global.css';

import { getSearchParams } from './util/searchParamHelper';
import { updateSpinnerLabels } from './controller/spinnerController';
import { initializeSidebar } from './controller/sidebarController';

const listEntries: string[] = getSearchParams() || [];

updateSpinnerLabels(listEntries);
initializeSidebar(listEntries);
