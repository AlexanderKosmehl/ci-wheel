import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';
import './global.css';

import generateIndexPage from './components/pages/index/indexPage';

const appContainer = document.querySelector<HTMLDivElement>('#app');
appContainer?.appendChild(generateIndexPage());
