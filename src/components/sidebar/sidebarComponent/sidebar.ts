import { updateSearchParams } from '../../../util/searchParamHelper';
import generateInputBar from '../inputBar/inputBar';
import generateListComponent from '../list/listComponent/listComponent';
import generateSidebarFooter from '../sidebarFooter/sidebarFooter';
import styles from './sidebar.module.css';

interface SidebarProps {
  listEntries: string[];
  listChangeCallback: (updatedList: string[]) => void;
  openImportModal: (importCallback: (importedEntries: string[]) => void) => void;
  openArchiveModal: () => void;
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

    sidebar.appendChild(generateInputBar({
      newEntryCallback: (newEntry: string) => {
        const newList = [...updatedEntries, newEntry];
        updateSidebar(newList);
        listChangeCallback(newList);
      },
    }));

    sidebar.appendChild(generateListComponent({
      listEntries: updatedEntries,
      entryRemovalCallback: (removedEntry: string) => {
        const newList = updatedEntries.filter((entry) => entry !== removedEntry);
        updateSidebar(newList);
        listChangeCallback(newList);
      },
    }));

    sidebar.append(generateSidebarFooter({
      importOnClick: () => {
        openImportModal((importedEntries) => {
          const newList = [...updatedEntries, ...importedEntries];

          updateSearchParams(newList);
          updateSidebar(newList);
          listChangeCallback(newList);
        });
      },
      archiveOnClick: () => {
        openArchiveModal();
      },
    }));
  };
  updateSidebar(listEntries);

  return sidebar;
}
