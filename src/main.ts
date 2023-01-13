import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';
import './global.css';

import generateIndexPage from './components/pages/index/indexPage';
import initSpinnerResizer from './util/spinnerResizeHelper';

document
  .querySelector<HTMLDivElement>('#app')
  ?.appendChild(generateIndexPage());

initSpinnerResizer();
