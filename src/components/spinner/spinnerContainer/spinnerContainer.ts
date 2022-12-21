import { SPIN_DURATION_IN_SEC } from '../../../config';
import generateSpinner from '../spinner/spinner';
import generateSpinnerButton from '../spinnerButton/spinnerButton';
import generateSpinnerTick from '../spinnerTick/spinnerTick';
import styles from './spinnerContainer.module.css';

function getLabelByAngle(labels: string[], angle: number) {
  const segmentAngle = 360 / labels.length;
  const preparedAngle = (angle - segmentAngle / 2) % 360;
  const indexAtDegree = Math.floor((360 - preparedAngle) / segmentAngle);
  return labels[indexAtDegree];
}

interface SpinnerComponentParams {
  labels: string[]
  spinCallback: (result: string) => void
}

export default function generateSpinnerComponent({
  labels,
  spinCallback,
}: SpinnerComponentParams) {
  const newSpinnerContainer = document.createElement<'div'>('div');
  newSpinnerContainer.classList.add(styles.container);

  newSpinnerContainer.textContent = '';

  const spinner = generateSpinner({
    labels,
  });
  newSpinnerContainer.appendChild(spinner);

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

  // Hide additional features if there are no labels on the wheel
  if (labels.length !== 0) {
    const tick = generateSpinnerTick();
    newSpinnerContainer.appendChild(tick);

    const button = generateSpinnerButton({
      onClick: clickListener,
    });
    newSpinnerContainer.appendChild(button);
  }

  return newSpinnerContainer;
}
