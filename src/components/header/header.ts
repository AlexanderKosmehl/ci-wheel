import styles from './header.module.css';
import logoURL from '../../assets/CI Logo.png';
import menuURL from '../../assets/menu.svg';
import texts from './header.text';
import generateIconButton from '../atoms/iconButton/iconButton';

export default function generateHeader() {
  const header = document.createElement<'header'>('header');
  header.classList.add(styles.header);

  const wrapper = document.createElement<'div'>('div');
  wrapper.classList.add(styles.logoTitleWrapper);

  const logo = document.createElement<'img'>('img');
  logo.classList.add(styles.headerLogo);
  logo.src = logoURL;

  const title = document.createElement<'h1'>('h1');
  title.classList.add(styles.headerTitle);
  title.textContent = texts.title;

  const sidebarToggle = generateIconButton({
    iconURL: menuURL,
    onClick: () => {
      const sidebar = document.querySelector<HTMLDivElement>('#sidebar');
      if (!sidebar) return;

      sidebar.toggleAttribute('hidden');
    },
    classes: [styles.sidebarToggle],
  });

  wrapper.appendChild(logo);
  wrapper.appendChild(title);

  header.appendChild(wrapper);
  header.appendChild(sidebarToggle);

  return header;
}
