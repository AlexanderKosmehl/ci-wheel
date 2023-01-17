import { Entry } from '../../../util/Entry';
import { getSearchParams } from '../../../util/searchParamHelper';
import generateHeader from '../../header/header';
import generateModalContainer from '../../modal/modalContainer/modalContainer';
import generateSidebar from '../../sidebar/sidebar';
import generateSpinnerComponent from '../../spinner/spinnerContainer/spinnerContainer';
import styles from './indexPage.module.css';

export default function generateIndexPage() {
  const initialValues = getSearchParams();
  const entries: Entry[] = initialValues.map((value) => ({
    name: value,
    isDone: false,
  }));

  const indexPage = document.createElement<'div'>('div');
  indexPage.classList.add(styles.indexPage);

  const header = generateHeader();
  indexPage.appendChild(header);

  const mainContainer = document.createElement<'div'>('div');
  mainContainer.id = 'spinner-container';
  mainContainer.classList.add(styles.mainContainer);

  const {
    modalContainer,
    openSpinResultModal,
    openImportModal,
    openArchiveModal,
  } = generateModalContainer();

  const spinnerContainer = document.createElement<'div'>('div');
  spinnerContainer.classList.add(styles.spinnerWrapper);

  const updateSpinner = () => {
    spinnerContainer.textContent = '';
    spinnerContainer.appendChild(
      generateSpinnerComponent({
        entries,
        spinCallback: (result: string) => {
          openSpinResultModal(result, () => {
            const updatedEntry = entries.find((entry) => entry.name === result);
            if (!updatedEntry) throw Error('No Entry found!');

            updatedEntry.isDone = !updatedEntry.isDone;
            updateSpinner();
          });
        },
      }),
    );
  };
  mainContainer.appendChild(spinnerContainer);
  updateSpinner();

  mainContainer.appendChild(
    generateSidebar({
      listEntries: initialValues,
      listChangeCallback: (updatedList: Entry[]) => {
        entries = [...updatedList];
        updateSpinner();
      },
      openImportModal,
      openArchiveModal,
    }),
  );

  indexPage.appendChild(mainContainer);
  indexPage.appendChild(modalContainer);

  return indexPage;
}
