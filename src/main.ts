import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';
import './global.css';

import generateIndexPage from './components/pages/index/indexPage';

document
  .querySelector<HTMLDivElement>('#app')
  ?.appendChild(generateIndexPage());
