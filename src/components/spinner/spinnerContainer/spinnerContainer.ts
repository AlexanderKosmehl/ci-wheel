import generateSpinner from '../spinner/spinner';
import generateSpinnerTick from '../spinnerTick/spinnerTick';
import styles from './spinnerContainer.module.css';

interface SpinnerComponentParams {
  initialLabels: string[]
  spinCallback: (result: string) => void
}

export default function generateSpinnerComponent({
  initialLabels,
  spinCallback,
}: SpinnerComponentParams) {
  const newSpinnerContainer = document.createElement<'div'>('div');
  newSpinnerContainer.classList.add(styles.container);

  newSpinnerContainer.textContent = '';

  const spinner = generateSpinner({
    labels: initialLabels,
    spinCallback,
  });
  newSpinnerContainer.appendChild(spinner);

  if (initialLabels.length !== 0) {
    const tick = generateSpinnerTick();
    newSpinnerContainer.appendChild(tick);
  }

  return newSpinnerContainer;
}
