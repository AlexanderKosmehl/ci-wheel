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

  function updateSpinner(newLabels: string[]) {
    newSpinnerContainer.textContent = '';

    const spinner = generateSpinner({
      labels: newLabels,
      spinCallback,
    });
    newSpinnerContainer.appendChild(spinner);

    if (!newLabels) return;
    const tick = generateSpinnerTick();
    newSpinnerContainer.appendChild(tick);
  }

  updateSpinner(initialLabels);

  return { newSpinnerContainer, updateSpinner };
}
