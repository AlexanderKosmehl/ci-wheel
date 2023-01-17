import { updateSearchParams } from '../../util/searchParamHelper';
import {
  getArchiveEntries,
  updateArchiveEntries,
} from '../modal/archiveModal/helper/archiveHelper';
import generateInputBar from './inputBar/inputBar';
import generateList from './list/list';
import generateSidebarFooter from './sidebarFooter/sidebarFooter';
import styles from './sidebar.module.css';
import { Entry } from '../../util/Entry';

interface SidebarProps {
  entries: Entry[];
  listChangeCallback: (updatedEntries: Entry[]) => void;
  openImportModal: (
    importCallback: (importedEntries: string[]) => void
  ) => void;
  openArchiveModal: (
    currentEntries: string[],
    updateCurrentEntries: (updatedEntries: string[]) => void
  ) => void;
}

export default function generateSidebar({
  entries,
  listChangeCallback,
  openImportModal,
  openArchiveModal,
}: SidebarProps) {
  const sidebar = document.createElement<'div'>('div');
  sidebar.classList.add(styles.sidebar);
  sidebar.toggleAttribute('hidden');
  sidebar.id = 'sidebar';

  const updateSidebar = (updatedEntries: Entry[]) => {
    sidebar.textContent = '';

    const updateDependencies = (changedEntries: Entry[]) => {
      updateSearchParams(changedEntries.map((entry) => entry.name));
      updateSidebar(changedEntries);
      listChangeCallback(changedEntries);
    };

    sidebar.appendChild(
      generateInputBar({
        newEntryCallback: (newEntry: string) => {
          if (updatedEntries.some((entry) => entry.name === newEntry)) return;

          const newList = [
            { name: newEntry, isDone: false },
            ...updatedEntries.map((oldEntry) => ({ name: oldEntry.name, isDone: false })),
          ];
          updateDependencies(newList);
        },
      }),
    );

    sidebar.appendChild(
      generateList({
        entries: updatedEntries,
        entryRemovalCallback: (removedEntry: Entry) => {
          const newList = updatedEntries
            .filter((oldEntry) => oldEntry.name !== removedEntry.name)
            .map((oldEntry) => ({ name: oldEntry.name, isDone: false }));
          updateDependencies(newList);
          updateArchiveEntries([removedEntry.name, ...getArchiveEntries()]);
        },
      }),
    );

    sidebar.append(
      generateSidebarFooter({
        importOnClick: () => {
          openImportModal((importedEntries) => {
            const filteredImports = importedEntries.filter(
              (newEntry) => !updatedEntries.some((oldEntry) => oldEntry.name === newEntry),
            );
            const newList = [
              ...filteredImports.map((importedEntry) => ({ name: importedEntry, isDone: false })),
              ...updatedEntries,
            ];
            updateDependencies(newList);
          });
        },
        archiveOnClick: () => {
          openArchiveModal(updatedEntries.map((entry) => entry.name), (newList) => {
            updateDependencies(newList);
          });
        },
      }),
    );
  };
  updateSidebar(entries);

  return sidebar;
}
