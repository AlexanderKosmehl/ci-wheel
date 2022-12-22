import { SPIN_DURATION_IN_SEC } from '../../../config';
import styles from './spinnerButton.module.css';
import texts from './spinnerButton.text';

interface SpinnerButtonProps {
  onClick: () => void
}

export default function generateSpinnerButton({ onClick }: SpinnerButtonProps) {
  const buttonWrapper = document.createElement<'div'>('div');
  buttonWrapper.classList.add(styles.wrapper);

  const button = document.createElement<'button'>('button');
  button.classList.add(styles.button);
  button.textContent = texts.buttonText;

  function onClickWrapper() {
    button.removeEventListener('click', onClickWrapper);
    button.disabled = true;
    onClick();

    setTimeout(() => {
      button.addEventListener('click', onClickWrapper);
      button.disabled = false;
    }, SPIN_DURATION_IN_SEC * 1000);
  }
  button.addEventListener('click', onClickWrapper);

  buttonWrapper.appendChild(button);

  return buttonWrapper;
}
