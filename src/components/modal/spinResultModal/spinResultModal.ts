import generateModal from '../modalBase/modalBase';
import texts from './spinResultModal.text';
import styles from './spinResultModal.module.css';
import { getCurrentEntries } from '../../../util/entryManager';

interface SpinResultModalParams {
  label: string;
  onClose: () => void;
}

export default function generateSpinResultModal({
  label,
  onClose,
}: SpinResultModalParams) {
  const contentWrapper = document.createElement<'div'>('div');

  const resultContainer = document.createElement<'div'>('div');
  resultContainer.classList.add(styles.resultContainer);

  const resultLabel = document.createElement<'span'>('span');
  resultLabel.classList.add(styles.resultLabel);
  resultLabel.textContent = label;
  resultContainer.appendChild(resultLabel);
  contentWrapper.appendChild(resultContainer);

  if (getCurrentEntries().filter(((entry) => !entry.isDone)).length > 1) {
    const buttonBar = document.createElement<'div'>('div');
    buttonBar.classList.add(styles.buttonBar);

    const againButton = document.createElement<'button'>('button');
    againButton.classList.add(styles.button);
    againButton.textContent = texts.againButton;
    againButton.onclick = () => {
      onClose();
      setTimeout(() => {
        document.querySelector<HTMLButtonElement>('button[data-test="spinnerButton"]')?.click();
      }, 200);
    };

    buttonBar.appendChild(againButton);
    contentWrapper.appendChild(buttonBar);
  }

  const modal = generateModal({
    title: texts.resultHeader,
    content: contentWrapper,
    onClose,
  });

  return modal;
}
