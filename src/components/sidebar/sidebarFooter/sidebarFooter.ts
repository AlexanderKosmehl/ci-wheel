import generateButton from '../../atoms/button/button';
import styles from './sidebarFooter.module.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SidebarFooterProps {
  importOnClick: () => void
  archiveOnClick: () => void
}

// eslint-disable-next-line no-empty-pattern
export default function generateSidebarFooter({
  importOnClick,
  archiveOnClick,
}: SidebarFooterProps) {
  const sidebarFooter = document.createElement<'div'>('div');
  sidebarFooter.classList.add(styles.container);

  sidebarFooter.appendChild(generateButton({
    content: 'Import',
    onClick: importOnClick,
    classes: [styles.footerButton],
  }));

  sidebarFooter.appendChild(generateButton({
    content: 'Archiv',
    onClick: archiveOnClick,
    classes: [styles.footerButton],
  }));

  return sidebarFooter;
}
