import styles from './modal.module.css';
import closeIcon from '../icons/x-icon.svg';
import deleteIcon from '../icons/trash-icon.svg';
import generateIconButton from './iconButton';

interface ModalParams {
  label: string
  onClose: () => void
  onDelete: () => void
}

export default function generateModal({ label, onClose, onDelete }: ModalParams) {
  const modalContainer = document.createElement<'div'>('div');
  modalContainer.classList.add(styles.container);

  const modalContent = document.createElement<'div'>('div');
  modalContent.classList.add(styles.content);
  modalContainer.appendChild(modalContent);

  const header = document.createElement<'div'>('div');
  header.classList.add(styles.header);

  const headerText = document.createElement<'h2'>('h2');
  headerText.classList.add(styles.headerText);
  headerText.textContent = 'Ergebnis:';
  header.appendChild(headerText);

  const closeButton = generateIconButton({
    iconURL: closeIcon,
    onClick: onClose,
    classes: [styles.closeIcon],
  });
  header.appendChild(closeButton);
  modalContent.appendChild(header);

  const resultElement = document.createElement<'div'>('div');
  resultElement.classList.add(styles.resultElement);

  const resultLabel = document.createElement<'h3'>('h3');
  resultLabel.classList.add(styles.resultLabel);
  resultLabel.textContent = label;

  const removeButton = generateIconButton({
    iconURL: deleteIcon,
    onClick: onDelete,
    classes: [styles.deleteIcon],
  });

  resultElement.appendChild(resultLabel);
  resultElement.appendChild(removeButton);
  modalContent.appendChild(resultElement);

  return modalContainer;
}
