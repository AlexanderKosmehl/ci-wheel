import { openArchiveModal, openImportModal } from '../../../util/modalManager';
import generateButton from '../../atoms/button/button';
import styles from './sidebarFooter.module.css';

export default function generateSidebarFooter() {
  const sidebarFooter = document.createElement<'div'>('div');
  sidebarFooter.classList.add(styles.container);

  sidebarFooter.appendChild(
    generateButton({
      content: 'Import',
      onClick: openImportModal,
      classes: [styles.footerButton],
      testSelector: 'sidebarImportButton',
    }),
  );

  sidebarFooter.appendChild(
    generateButton({
      content: 'Archiv',
      onClick: openArchiveModal,
      classes: [styles.footerButton],
      testSelector: 'sidebarArchiveButton',
    }),
  );

  return sidebarFooter;
}
