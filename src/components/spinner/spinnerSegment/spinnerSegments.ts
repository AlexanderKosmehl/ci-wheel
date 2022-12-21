import { SEGMENT_COLORS, WHEEL_GAP_IN_PX } from '../../../config';
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

export default function generateSpinnerSegments(labels: string[]) {
  return labels.map((label, labelIndex) => {
    const segmentElement = document.createElement<'div'>('div');
    segmentElement.classList.add(styles.segment);

    const labelElement = document.createElement<'span'>('span');
    labelElement.classList.add(styles.label);
    labelElement.textContent = label;

    segmentElement.appendChild(labelElement);
    segmentElement.style.transform = createSegmentRotationString(labelIndex, labels.length);
    segmentElement.style.clipPath = createSegmentClipPathString(labels.length);
    segmentElement.style.backgroundColor = SEGMENT_COLORS[labelIndex % SEGMENT_COLORS.length];

    return segmentElement;
  });
}
