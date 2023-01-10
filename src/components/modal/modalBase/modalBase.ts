import generateIconButton from '../../atoms/iconButton/iconButton';
import styles from './modalBase.module.css';
import closeIcon from '../../../assets/cross-icon.svg';

interface ModalBaseParams {
  title: string
  content: HTMLElement
  onClose: () => void
}

export default function generateModal({ title, content, onClose }: ModalBaseParams) {
  const modalContainer = document.createElement<'div'>('div');
  modalContainer.classList.add(styles.container);

  const modalContent = document.createElement<'div'>('div');
  modalContent.classList.add(styles.content);
  modalContainer.appendChild(modalContent);

  const header = document.createElement<'div'>('div');
  header.classList.add(styles.header);

  const headerText = document.createElement<'h2'>('h2');
  headerText.classList.add(styles.headerText);
  headerText.textContent = title;
  header.appendChild(headerText);

  const closeButton = generateIconButton({
    iconURL: closeIcon,
    onClick: onClose,
    classes: [styles.closeIcon],
  });
  header.appendChild(closeButton);
  modalContent.appendChild(header);

  modalContent.appendChild(content);

  return modalContainer;
}
