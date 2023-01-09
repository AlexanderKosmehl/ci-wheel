import {
  SEGMENT_COLORS, SPINNER_TICK_OFFSET_IN_REM,
} from '../../../config';
import { calculateSufficientHightLocation, createSegmentClipPathString, createSegmentRotationString } from './helper/spinnerSegmentHelper';
import styles from './spinnerSegments.module.css';

export default function generateSpinnerSegments(labels: string[]) {
  const sufficientHightLocation = calculateSufficientHightLocation(labels.length);
  return labels.map((label, labelIndex) => {
    const segmentElement = document.createElement<'div'>('div');
    segmentElement.classList.add(styles.segment);

    const labelElement = document.createElement<'span'>('span');
    labelElement.classList.add(styles.label);
    labelElement.textContent = label;
    labelElement.title = label;
    labelElement.style.width = `calc(50% - ${SPINNER_TICK_OFFSET_IN_REM}rem - ${sufficientHightLocation}px)`;

    segmentElement.appendChild(labelElement);
    segmentElement.style.transform = createSegmentRotationString(labelIndex, labels.length);
    segmentElement.style.clipPath = createSegmentClipPathString(labels.length);
    segmentElement.style.backgroundColor = SEGMENT_COLORS[labelIndex % SEGMENT_COLORS.length];

    return segmentElement;
  });
}
