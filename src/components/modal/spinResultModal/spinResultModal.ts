import styles from './spinResultModal.module.css';
import deleteIcon from '../../../icons/trash-icon.svg';
import generateIconButton from '../../atoms/iconButton/iconButton';
import generateModal from '../modalBase/modalBase';
import texts from './spinResultModal.text';

interface SpinResultModalParams {
  label: string
  onClose: () => void
  onDelete: () => void
}

export default function generateSpinResultModal({
  label,
  onClose,
  onDelete,
}: SpinResultModalParams) {
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

  const modal = generateModal({
    title: texts.resultHeader,
    content: resultElement,
    onClose,
  });

  return modal;
}
