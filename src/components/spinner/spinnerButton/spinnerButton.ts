import { SPIN_DURATION_IN_SEC } from '../../../config';
import generateIconButton from '../../atoms/iconButton/iconButton';
import styles from './spinnerButton.module.css';

import rotateIcon from '../../../assets/rotate-icon.svg';

interface SpinnerButtonProps {
  onClick: () => void
}

export default function generateSpinnerButton({ onClick }: SpinnerButtonProps) {
  const button = generateIconButton({
    iconURL: rotateIcon,
    classes: [styles.button],
  });

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

  return button;
}
