import generateHeader from '../../header/header';
import generateModalContainer from '../../modal/modalContainer/modalContainer';
import generateSidebar from '../../sidebar/sidebarComponent/sidebar';
import generateSpinnerComponent from '../../spinner/spinnerContainer/spinnerContainer';
import styles from './indexPage.module.css';

export default function generateIndexPage() {
  const indexPage = document.createElement<'div'>('div');
  indexPage.classList.add(styles.indexPage);

  const {
    modalContainer, openSpinResultModal, openImportModal, openArchiveModal,
  } = generateModalContainer();

  let spinnerContainer;

  const updateSpinner = (newEntries: string[]) => {
    spinnerContainer = generateSpinnerComponent({
      labels: newEntries,
      spinCallback: (result: string) => {
        openSpinResultModal(result, () => {
          updateSpinner(newEntries.filter((entry) => entry !== result));
        });
      },
    });
  };
  updateSpinner(['Test']);

  const { sidebar, toggleSidebar } = generateSidebar({
    listEntries: [] as string[],
    listChangeCallback: () => {},
    importOnClick: () => {
      openImportModal((importedEntries) => {
        updateSpinner(importedEntries);
      });
    },
    archiveOnClick: () => {
      openArchiveModal();
    },
  });

  const header = generateHeader({
    onSidebarToggle: toggleSidebar,
  });
  indexPage.appendChild(header);

  const mainContainer = document.createElement<'div'>('div');
  mainContainer.classList.add(styles.mainContainer);

  mainContainer.appendChild(spinnerContainer);
  mainContainer.appendChild(sidebar);

  indexPage.appendChild(mainContainer);
  indexPage.appendChild(modalContainer);

  return indexPage;
}
