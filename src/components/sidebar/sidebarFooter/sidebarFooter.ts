import generateButton from '../../atoms/button/button';
import styles from './sidebarFooter.module.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SidebarFooterProps {

}

// eslint-disable-next-line no-empty-pattern
export default function generateSidebarFooter({}: SidebarFooterProps) {
  const sidebarFooter = document.createElement<'div'>('div');
  sidebarFooter.classList.add(styles.container);

  sidebarFooter.appendChild(generateButton({
    content: 'Text-Mode',
    onClick: () => {},
    classes: [styles.footerButton],
  }));

  sidebarFooter.appendChild(generateButton({
    content: 'Archiv',
    onClick: () => {},
    classes: [styles.footerButton],
  }));

  return sidebarFooter;
}
