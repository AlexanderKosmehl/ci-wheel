import styles from './header.module.css';
import logoURL from '../../assets/CI Logo.png';
import menuURL from '../../assets/menu.svg';
import closeURL from '../../assets/angle-right.svg';
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

  wrapper.appendChild(logo);
  wrapper.appendChild(title);

  header.appendChild(wrapper);

  let closeSidebarIcon: HTMLButtonElement;
  let openSidebarIcon: HTMLButtonElement;

  const toggleSidebar = () => {
    const sidebar = document.querySelector<HTMLDivElement>('#sidebar');
    if (!sidebar) return;

    sidebar.toggleAttribute('hidden');
    openSidebarIcon?.classList.toggle(styles.hidden);
    closeSidebarIcon.classList.toggle(styles.hidden);
  };

  const menuButtonWrapper = document.createElement<'div'>('div');
  menuButtonWrapper.classList.add(styles.menuButtonWrapper);

  openSidebarIcon = generateIconButton({
    iconURL: menuURL,
    onClick: toggleSidebar,
    classes: [styles.sidebarToggle],
  });

  closeSidebarIcon = generateIconButton({
    iconURL: closeURL,
    onClick: toggleSidebar,
    classes: [styles.sidebarToggle, styles.hidden],
  });

  menuButtonWrapper.appendChild(openSidebarIcon);
  menuButtonWrapper.appendChild(closeSidebarIcon);

  header.appendChild(menuButtonWrapper);

  return header;
}
