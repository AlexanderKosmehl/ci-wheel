import generateModal from '../modalBase/modalBase';
import texts from './spinResultModal.text';
import styles from './spinResultModal.module.css';
import generateIconButton from '../../atoms/iconButton/iconButton';
import doneIcon from '../../../assets/done-icon.svg';

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
  const resultContainer = document.createElement<'div'>('div');
  resultContainer.classList.add(styles.resultContainer);

  const resultLabel = document.createElement<'span'>('span');
  resultLabel.classList.add(styles.resultLabel);
  resultLabel.textContent = label;
  resultContainer.appendChild(resultLabel);

  const doneButton = generateIconButton({
    iconURL: doneIcon,
    onClick: onDelete,
    classes: [styles.doneIcon],
  });
  resultContainer.appendChild(doneButton);

  const modal = generateModal({
    title: texts.resultHeader,
    content: resultContainer,
    onClose,
  });

  return modal;
}
