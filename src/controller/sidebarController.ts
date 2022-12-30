import generateSidebar from '../components/sidebar/sidebar';
import { updateSearchParams } from '../util/searchParamHelper';
import { updateSpinnerLabels } from './spinnerController';

const sidebarContainer = document.querySelector<HTMLDivElement>('#sidebar');

function deleteExistingSidebar() {
  if (!sidebarContainer) return;

  sidebarContainer.textContent = '';
}

export default function updateSidebar(listEntries: string[]) {
  if (!sidebarContainer) return;

  deleteExistingSidebar();

  sidebarContainer.appendChild(
    generateSidebar({
      listEntries,
      entryRemovalCallback: (removedEntry: string) => {
        const updatedEntries = listEntries.filter((entry) => entry !== removedEntry);
        updateSearchParams(updatedEntries);
        updateSpinnerLabels(updatedEntries);
        updateSidebar(updatedEntries);
      },
      newEntryCallback: (newEntry: string) => {
        const updatedEntries = [...listEntries, newEntry];
        updateSearchParams(updatedEntries);
        updateSpinnerLabels(updatedEntries);
        updateSidebar(updatedEntries);
      },
    }),
  );
}
