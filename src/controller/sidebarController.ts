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

function updateDependencies(listEntries: string[]) {
  updateSearchParams(listEntries);
  updateSpinnerLabels(listEntries);
}

export function updateList(listEntries: string[]) {
  const list = sidebarContainer?.querySelector('ul');
  if (!list) return;

  list.replaceWith(generateListComponent({
    listEntries,
    entryRemovalCallback: (removedEntry: string) => {
      const updatedList = listEntries.filter((entry) => entry !== removedEntry);
      updateList(updatedList);
      updateDependencies(updatedList);
    },
  }));
}

export function initializeSidebar(listEntries: string[]) {
  if (!sidebarContainer) return;

  deleteExistingSidebar();

  sidebarContainer.appendChild(generateInputBar({
    newEntryCallback: (newEntry: string) => {
      const updatedList = [...listEntries, newEntry];
      updateList(updatedList);
      updateDependencies(updatedList);
    },
  }));
  sidebarContainer.appendChild(generateListComponent({
    listEntries,
    entryRemovalCallback: (removedEntry: string) => {
      const updatedList = listEntries.filter((entry) => entry !== removedEntry);
      updateList(updatedList);
      updateDependencies(updatedList);
    },
  }));
  sidebarContainer.appendChild(generateSidebarFooter({
    importOnClick: openImportModal,
    archiveOnClick: openArchiveModal,
  }));
}
