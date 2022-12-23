import {
  SEGMENT_COLORS, SPINNER_TICK_OFFSET_IN_REM, SPIN_BUTTON_SIZE_IN_REM, WHEEL_GAP_IN_PX,
} from '../../../config';
import styles from './spinnerSegments.module.css';

function createSegmentRotationString(
  segmentIndex: number,
  numberOfSegments: number,
) {
  return `rotate(${segmentIndex * (360 / numberOfSegments)}deg)`;
}

function createSegmentClipPathString(numberOfSegments: number) {
  let polygonString = '';

  if (numberOfSegments === 2) {
    polygonString = `polygon(
      calc(50% + ${WHEEL_GAP_IN_PX}px) 0%,
      100% 0%,
      100% 100%,
      calc(50% + ${WHEEL_GAP_IN_PX}px) 100%
    )`;
  } else if (numberOfSegments >= 3) {
    const angleInRad = (360 / numberOfSegments / 2) * (Math.PI / 180);
    const offsetTan = Math.tan(angleInRad);

    polygonString = `polygon(
      calc(50% + ${WHEEL_GAP_IN_PX / 2}px) 50%,
      100% calc(50% - ${offsetTan} * (50% - ${WHEEL_GAP_IN_PX / 2}px)),
      100% calc(50% + ${offsetTan} * (50% - ${WHEEL_GAP_IN_PX / 2}px))
    )`;
  }
  return polygonString;
}

function convertRemToPixels(rem: number) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function calculateSufficientHightLocation(numberOfSegments: number) {
  if (numberOfSegments < 3) return convertRemToPixels(SPIN_BUTTON_SIZE_IN_REM);

  const remainingAngle = 180 - 90 - (360 / numberOfSegments / 2);
  const angleInRad = remainingAngle * (Math.PI / 180);
  const requiredHight = convertRemToPixels(1.75 / 2);

  return Math.max(
    convertRemToPixels(SPIN_BUTTON_SIZE_IN_REM),
    Math.tan(angleInRad) * requiredHight,
  );
}

export default function generateSpinnerSegments(labels: string[]) {
  const sufficientHightLocation = calculateSufficientHightLocation(labels.length);
  return labels.map((label, labelIndex) => {
    const segmentElement = document.createElement<'div'>('div');
    segmentElement.classList.add(styles.segment);

    const labelElement = document.createElement<'span'>('span');
    labelElement.classList.add(styles.label);
    labelElement.textContent = label;
    labelElement.style.width = `calc(50% - ${SPINNER_TICK_OFFSET_IN_REM}rem - ${sufficientHightLocation}px)`;

    segmentElement.appendChild(labelElement);
    segmentElement.style.transform = createSegmentRotationString(labelIndex, labels.length);
    segmentElement.style.clipPath = createSegmentClipPathString(labels.length);
    segmentElement.style.backgroundColor = SEGMENT_COLORS[labelIndex % SEGMENT_COLORS.length];

    return segmentElement;
  });
}
