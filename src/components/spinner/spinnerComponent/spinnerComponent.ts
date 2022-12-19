import { SPIN_DURATION_IN_SEC } from '../../../config';
import generateSpinnerSegments from '../spinnerSegment/spinnerSegments';
import styles from './spinnerComponent.module.css';

interface SpinnerParams {
  labels: string[]
  spinCallback: (result: string) => void
}

function getLabelByAngle(labels: string[], angle: number) {
  const segmentAngle = 360 / labels.length;
  const preparedAngle = (angle - segmentAngle / 2) % 360;
  const indexAtDegree = Math.floor((360 - preparedAngle) / segmentAngle);
  return labels[indexAtDegree];
}

export default function generateSpinner({ labels, spinCallback }: SpinnerParams) {
  const spinner = document.createElement<'div'>('div');
  spinner.classList.add(styles.spinner);
  spinner.style.transition = `${SPIN_DURATION_IN_SEC}s`;

  const newSpinnerSegments = generateSpinnerSegments(labels);
  newSpinnerSegments.forEach((segment) => spinner.appendChild(segment));

  let currentAngle = 0;

  function clickListener() {
    currentAngle += 720 + Math.random() * 360;
    spinner.style.transform = `rotate(${currentAngle}deg)`;

    spinner.removeEventListener('click', clickListener);
    setTimeout(() => {
      spinCallback(getLabelByAngle(labels, currentAngle));
      spinner.addEventListener('click', clickListener);
    }, SPIN_DURATION_IN_SEC * 1000);
  }

  if (labels.length > 0) spinner.addEventListener('click', clickListener);

  return spinner;
}
