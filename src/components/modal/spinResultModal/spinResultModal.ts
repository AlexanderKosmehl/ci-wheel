import generateModal from '../modalBase/modalBase';
import texts from './spinResultModal.text';
import styles from './spinResultModal.module.css';

interface SpinResultModalParams {
  label: string;
  onClose: () => void;
}

export default function generateSpinResultModal({
  label,
  onClose,
}: SpinResultModalParams) {
  const resultContainer = document.createElement<'div'>('div');
  resultContainer.classList.add(styles.resultContainer);

  const resultLabel = document.createElement<'span'>('span');
  resultLabel.classList.add(styles.resultLabel);
  resultLabel.textContent = label;
  resultContainer.appendChild(resultLabel);

  const modal = generateModal({
    title: texts.resultHeader,
    content: resultContainer,
    onClose,
  });

  return modal;
}
