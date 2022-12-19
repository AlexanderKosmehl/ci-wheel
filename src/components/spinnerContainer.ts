import generateSpinner from './spinner';
import styles from './spinnerContainer.module.css';
import generateSpinnerTick from './spinnerTick';

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
