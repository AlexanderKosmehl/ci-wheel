import styles from './spinnerTick.module.css';

export default function generateSpinnerTick() {
  const shadowWrapper = document.createElement<'div'>('div');
  shadowWrapper.classList.add(styles.tickShadow);
  const spinnerTick = document.createElement<'div'>('div');
  spinnerTick.classList.add(styles.tick);

  shadowWrapper.appendChild(spinnerTick);

  return shadowWrapper;
}
