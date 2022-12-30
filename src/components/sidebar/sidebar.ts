import generateInputBar from './inputBar/inputBar';
import generateListComponent from './list/listComponent/listComponent';
import generateSidebarFooter from './sidebarFooter/sidebarFooter';
import styles from './sidebar.module.css';

interface SidebarProps {
  listEntries: string[]
  newEntryCallback: (newEntry: string) => void
  entryRemovalCallback: (removedEntry: string) => void
}

export default function generateSidebar({
  newEntryCallback,
  listEntries,
  entryRemovalCallback,
}: SidebarProps) {
  const sidebar = document.createElement<'div'>('div');
  sidebar.classList.add(styles.sidebar);

  sidebar.appendChild(generateInputBar({ newEntryCallback }));
  sidebar.appendChild(generateListComponent({
    listEntries,
    entryRemovalCallback,
  }));
  sidebar.appendChild(generateSidebarFooter({}));

  return sidebar;
}
