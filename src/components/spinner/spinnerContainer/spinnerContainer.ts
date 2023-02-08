import { MIN_SPINS_IN_DEG, SPIN_DURATION_IN_SEC } from '../../../config';
import { Entry } from '../../../util/Entry';
import { EntryEvents } from '../../../util/EntryEvents';
import { initEntryManager } from '../../../util/entryManager';
import { openSpinResultModal } from '../../../util/modalManager';
import generateButton from '../../atoms/button/button';
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

export default function generateSpinnerContainer() {
  const newSpinnerContainer = document.createElement<'div'>('div');
  newSpinnerContainer.classList.add(styles.container);

  const updateSpinner = (spinnerEntries: Entry[]) => {
    newSpinnerContainer.textContent = '';
    const spinnerLabels = spinnerEntries
      .filter((entry) => !entry.isDone)
      .map((entry) => entry.name);

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

    if (spinnerLabels.length !== 0) {
      newSpinnerContainer.appendChild(spinner);

      const tick = generateSpinnerTick();
      newSpinnerContainer.appendChild(tick);

      const button = generateSpinnerButton({
        onClick: spinnerButtonCallback,
      });
      newSpinnerContainer.appendChild(button);
    } else if (spinnerEntries.length !== 0) {
      // No entries remaining -> Show restart helper
      const restartContainer = document.createElement<'div'>('div');
      restartContainer.classList.add(styles.restartContainer);

      const restartText = document.createElement<'span'>('span');
      restartText.classList.add(styles.placeholder);
      restartText.textContent = texts.restartSuggestion;
      restartContainer.appendChild(restartText);

      const restartButton = generateButton({
        content: texts.restartButtonText,
        classes: [styles.restartButton],
        onClick: initEntryManager,
      });
      restartContainer.appendChild(restartButton);
      newSpinnerContainer.appendChild(restartContainer);
    } else {
      // No entries at all -> Show placeholder
      const placeholder = document.createElement<'span'>('span');
      placeholder.classList.add(styles.placeholder);
      placeholder.textContent = texts.placeholderText;
      newSpinnerContainer.appendChild(placeholder);
    }
  };

  window.addEventListener(EntryEvents.UPDATE, ((event: CustomEvent<Entry[]>) => {
    updateSpinner(event.detail);
  }) as EventListener);

  return newSpinnerContainer;
}
