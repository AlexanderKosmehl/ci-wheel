import generateShareWidget from '../../atoms/shareWidget/shareWidget';
import generateHeader from '../../header/header';
import generateSidebar from '../../sidebar/sidebar';
import generateSpinnerContainer from '../../spinner/spinnerContainer/spinnerContainer';
import styles from './indexPage.module.css';

export default function generateIndexPage() {
  const indexPage = document.createElement<'div'>('div');
  indexPage.classList.add(styles.indexPage);

  const header = generateHeader();
  indexPage.appendChild(header);

  const mainContainer = document.createElement<'div'>('div');
  mainContainer.id = 'spinner-container';
  mainContainer.classList.add(styles.mainContainer);

  const spinnerContainer = document.createElement<'div'>('div');
  spinnerContainer.classList.add(styles.spinnerWrapper);

  spinnerContainer.appendChild(generateSpinnerContainer());
  mainContainer.appendChild(spinnerContainer);

  mainContainer.appendChild(generateSidebar());

  const shareWidget = generateShareWidget();
  shareWidget.classList.add(styles.shareWidget);
  mainContainer.appendChild(shareWidget);

  indexPage.appendChild(mainContainer);

  const modalContainer = document.createElement<'div'>('div');
  modalContainer.id = 'modal-container';
  indexPage.appendChild(modalContainer);

  return indexPage;
}
