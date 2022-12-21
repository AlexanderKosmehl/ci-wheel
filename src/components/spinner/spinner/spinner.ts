import { SPIN_DURATION_IN_SEC } from '../../../config';
import generateSpinnerSegments from '../spinnerSegment/spinnerSegments';
import styles from './spinner.module.css';

interface SpinnerParams {
  labels: string[]
}

export default function generateSpinner({ labels }: SpinnerParams) {
  const spinner = document.createElement<'div'>('div');
  spinner.classList.add(styles.spinner);
  spinner.style.transition = `${SPIN_DURATION_IN_SEC}s`;

  const newSpinnerSegments = generateSpinnerSegments(labels);
  newSpinnerSegments.forEach((segment) => spinner.appendChild(segment));

  return spinner;
}
