import generateSpinner from '../spinner/spinner';
import generateSpinnerTick from '../spinnerTick/spinnerTick';
import styles from './spinnerContainer.module.css';

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
    spinCallback,
  });
  newSpinnerContainer.appendChild(spinner);

  if (labels.length !== 0) {
    const tick = generateSpinnerTick();
    newSpinnerContainer.appendChild(tick);
  }

  return newSpinnerContainer;
}
