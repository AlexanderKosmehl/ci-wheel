import generateIconButton from '../../atoms/iconButton/iconButton';
import styles from './modalBase.module.css';
import closeIcon from '../../../assets/close-icon.svg';

interface ModalBaseParams {
  title: string;
  content: HTMLElement;
  onClose: () => void;
}

export default function generateModal({
  title,
  content,
  onClose,
}: ModalBaseParams) {
  const modalContainer = document.createElement<'div'>('div');
  modalContainer.classList.add(styles.container);

  modalContainer.addEventListener('click', (event: MouseEvent) => {
    if (event.target !== modalContainer) return;

    onClose();
  });

  window.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key !== 'Escape') return;

    onClose();
  });

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
    classes: [styles.closeButton],
    testSelector: 'modalCloseButton',
  });
  header.appendChild(closeButton);
  modalContent.appendChild(header);

  modalContent.appendChild(content);

  return modalContainer;
}
