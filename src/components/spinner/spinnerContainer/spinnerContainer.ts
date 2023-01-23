import { MIN_SPINS_IN_DEG, SPIN_DURATION_IN_SEC } from '../../../config';
import { Entry } from '../../../util/Entry';
import { EntryEvents } from '../../../util/EntryEvents';
import { openSpinResultModal } from '../../../util/modalManager';
import generateSpinner from '../spinner';
import generateSpinnerButton from '../spinnerButton/spinnerButton';
import generateSpinnerTick from '../spinnerTick/spinnerTick';
import styles from './spinnerContainer.module.css';
import texts from './spinnerContainer.text';

function getLabelByAngle(labels: string[], angle: number) {
  const segmentAngle = 360 / labels.length;
  const preparedAngle = (angle - segmentAngle / 2) % 360;
  const indexAtDegree = Math.floor((360 - preparedAngle) / segmentAngle);
  return labels[indexAtDegree];
}

export default function generateSpinnerComponent() {
  const newSpinnerContainer = document.createElement<'div'>('div');
  newSpinnerContainer.classList.add(styles.container);

  const updateSpinner = (spinnerLabels: string[]) => {
    newSpinnerContainer.textContent = '';
    const spinner = generateSpinner({
      labels: spinnerLabels,
    });
    let currentAngle = 0;

    function spinnerButtonCallback() {
      currentAngle += MIN_SPINS_IN_DEG + Math.random() * 360;
      spinner.style.transform = `rotate(${currentAngle}deg)`;

      setTimeout(
        () => openSpinResultModal(getLabelByAngle(spinnerLabels, currentAngle)),
        SPIN_DURATION_IN_SEC * 1000,
      );
    }

    // Display placeholder if there are no labels on the wheel
    if (spinnerLabels.length !== 0) {
      newSpinnerContainer.appendChild(spinner);

      const tick = generateSpinnerTick();
      newSpinnerContainer.appendChild(tick);

      const button = generateSpinnerButton({
        onClick: spinnerButtonCallback,
      });
      newSpinnerContainer.appendChild(button);
    } else {
      const placeholder = document.createElement<'span'>('span');
      placeholder.classList.add(styles.placeholder);
      placeholder.textContent = texts.placeholderText;
      newSpinnerContainer.appendChild(placeholder);
    }
  };

  window.addEventListener(EntryEvents.UPDATE, ((event: CustomEvent<Entry[]>) => {
    const remainingTodos = event.detail.filter((entry) => !entry.isDone);
    updateSpinner(remainingTodos.map((entry) => entry.name));
  }) as EventListener);

  return newSpinnerContainer;
}
