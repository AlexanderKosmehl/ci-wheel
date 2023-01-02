import generateButton from '../../atoms/button/button';
import styles from './sidebarFooter.module.css';

interface SidebarFooterProps {
  importOnClick: () => void
  archiveOnClick: () => void
}

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
