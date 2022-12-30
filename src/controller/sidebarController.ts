import generateInputBar from '../components/sidebar/inputBar/inputBar';
import generateListComponent from '../components/sidebar/list/listComponent/listComponent';
import generateSidebarFooter from '../components/sidebar/sidebarFooter/sidebarFooter';
import { updateSearchParams } from '../util/searchParamHelper';
import { openArchiveModal, openImportModal } from './modalController';
import { updateSpinnerLabels } from './spinnerController';

const sidebarContainer = document.querySelector<HTMLDivElement>('#sidebar');

function deleteExistingSidebar() {
  if (!sidebarContainer) return;

  sidebarContainer.textContent = '';
}

let entryList: string[] = [];

function updateDependencies() {
  updateSearchParams(entryList);
  updateSpinnerLabels(entryList);
}

export function updateList() {
  const list = sidebarContainer?.querySelector('ul');
  if (!list) return;

  list.replaceWith(generateListComponent({
    listEntries: [...entryList],
    entryRemovalCallback: (removedEntry: string) => {
      entryList = entryList.filter((entry) => entry !== removedEntry);
      updateList();
      updateDependencies();
    },
  }));
}

export function initializeSidebar(listEntries: string[]) {
  if (!sidebarContainer) return;

  entryList = listEntries;
  deleteExistingSidebar();

  sidebarContainer.appendChild(generateInputBar({
    newEntryCallback: (newEntry: string) => {
      entryList = [...entryList, newEntry];
      updateList();
      updateDependencies();
    },
  }));
  sidebarContainer.appendChild(generateListComponent({
    listEntries,
    entryRemovalCallback: (removedEntry: string) => {
      entryList = entryList.filter((entry) => entry !== removedEntry);
      updateList();
      updateDependencies();
    },
  }));
  sidebarContainer.appendChild(generateSidebarFooter({
    importOnClick: openImportModal,
    archiveOnClick: openArchiveModal,
  }));
}
