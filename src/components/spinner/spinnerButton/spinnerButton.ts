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
  button.onclick = onClick;

  buttonWrapper.appendChild(button);

  return buttonWrapper;
}
