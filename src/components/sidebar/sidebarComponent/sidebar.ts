import generateInputBar from '../inputBar/inputBar';
import generateListComponent from '../list/listComponent/listComponent';
import generateSidebarFooter from '../sidebarFooter/sidebarFooter';
import styles from './sidebar.module.css';

interface SidebarProps {
  listEntries: string[];
  listChangeCallback: (updatedList: string[]) => void;
  importOnClick: () => void;
  archiveOnClick: () => void;
}

export default function generateSidebar({
  listEntries,
  listChangeCallback,
  importOnClick,
  archiveOnClick,
}: SidebarProps) {
  const sidebar = document.createElement<'div'>('div');
  sidebar.classList.add(styles.sidebar);
  sidebar.classList.add(styles.sidebarHidden);

  const inputBar = generateInputBar({
    newEntryCallback: (newEntry: string) => listChangeCallback([...listEntries, newEntry]),
  });

  const listContainer = generateListComponent({
    listEntries,
    entryRemovalCallback: (removedEntry: string) => listChangeCallback(
      listEntries.filter((existingEntry) => existingEntry !== removedEntry),
    ),
  });

  const footer = generateSidebarFooter({
    importOnClick,
    archiveOnClick,
  });

  sidebar.appendChild(inputBar);
  sidebar.appendChild(listContainer);
  sidebar.appendChild(footer);

  const toggleSidebar = () => {
    sidebar.classList.toggle(styles.sidebarHidden);
  };

  return {
    sidebar,
    toggleSidebar,
  };
}
