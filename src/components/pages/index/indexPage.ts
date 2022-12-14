import { getSearchParams } from '../../../util/searchParamHelper';
import generateHeader from '../../header/header';
import generateModalContainer from '../../modal/modalContainer/modalContainer';
import generateSidebar from '../../sidebar/sidebarComponent/sidebar';
import generateSpinnerComponent from '../../spinner/spinnerContainer/spinnerContainer';
import styles from './indexPage.module.css';

export default function generateIndexPage() {
  const initialValues = getSearchParams();

  const indexPage = document.createElement<'div'>('div');
  indexPage.classList.add(styles.indexPage);

  const header = generateHeader();
  indexPage.appendChild(header);

  const mainContainer = document.createElement<'div'>('div');
  mainContainer.classList.add(styles.mainContainer);

  const {
    modalContainer, openSpinResultModal, openImportModal, openArchiveModal,
  } = generateModalContainer();

  const spinnerContainer = document.createElement<'div'>('div');
  spinnerContainer.classList.add(styles.spinnerWrapper);

  const updateSpinner = (newEntries: string[]) => {
    spinnerContainer.textContent = '';
    spinnerContainer.appendChild(generateSpinnerComponent({
      labels: newEntries,
      spinCallback: (result: string) => {
        openSpinResultModal(result, () => {
          updateSpinner(newEntries.filter((entry) => entry !== result));
        });
      },
    }));
  };
  mainContainer.appendChild(spinnerContainer);
  updateSpinner(initialValues);

  mainContainer.appendChild(generateSidebar({
    listEntries: initialValues,
    listChangeCallback: (updatedList: string[]) => {
      updateSpinner(updatedList);
    },
    openImportModal,
    openArchiveModal,
  }));

  indexPage.appendChild(mainContainer);
  indexPage.appendChild(modalContainer);

  return indexPage;
}
