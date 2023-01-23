import generateInputBar from './inputBar/inputBar';
import generateList from './list/list';
import generateSidebarFooter from './sidebarFooter/sidebarFooter';
import styles from './sidebar.module.css';

export default function generateSidebar() {
  const sidebar = document.createElement<'div'>('div');
  sidebar.classList.add(styles.sidebar);
  sidebar.toggleAttribute('hidden');
  sidebar.id = 'sidebar';

  sidebar.appendChild(generateInputBar());

  sidebar.appendChild(generateList());

  sidebar.appendChild(generateSidebarFooter());

  return sidebar;
}
