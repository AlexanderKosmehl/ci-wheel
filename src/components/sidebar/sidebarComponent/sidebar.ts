import { updateSearchParams } from '../../../util/searchParamHelper';
import generateInputBar from '../inputBar/inputBar';
import generateListComponent from '../list/listComponent/listComponent';
import generateSidebarFooter from '../sidebarFooter/sidebarFooter';
import styles from './sidebar.module.css';

interface SidebarProps {
  listEntries: string[];
  listChangeCallback: (updatedList: string[]) => void;
  openImportModal: (importCallback: (importedEntries: string[]) => void) => void;
  openArchiveModal:
  (
    currentEntries: string[],
    updateCurrentEntries: (updatedEntries: string[]) => void
  ) => void;
}

export default function generateSidebar({
  listEntries,
  listChangeCallback,
  openImportModal,
  openArchiveModal,
}: SidebarProps) {
  const sidebar = document.createElement<'div'>('div');
  sidebar.classList.add(styles.sidebar);
  sidebar.toggleAttribute('hidden');
  sidebar.id = 'sidebar';

  const updateSidebar = (updatedEntries: string[]) => {
    sidebar.textContent = '';

    const updateDependencies = (newList: string[]) => {
      updateSearchParams(newList);
      updateSidebar(newList);
      listChangeCallback(newList);
    };

    sidebar.appendChild(generateInputBar({
      newEntryCallback: (newEntry: string) => {
        const newList = [...updatedEntries, newEntry];
        updateDependencies(newList);
      },
    }));

    sidebar.appendChild(generateListComponent({
      listEntries: updatedEntries,
      entryRemovalCallback: (removedEntry: string) => {
        const newList = updatedEntries.filter((entry) => entry !== removedEntry);
        updateDependencies(newList);
      },
    }));

    sidebar.append(generateSidebarFooter({
      importOnClick: () => {
        openImportModal((importedEntries) => {
          const newList = [...updatedEntries, ...importedEntries];
          updateDependencies(newList);
        });
      },
      archiveOnClick: () => {
        openArchiveModal(updatedEntries, (newList) => {
          updateDependencies(newList);
        });
      },
    }));
  };
  updateSidebar(listEntries);

  return sidebar;
}
