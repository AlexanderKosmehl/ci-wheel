import { WHEEL_GAP_IN_PX } from '../config';

function createSegmentRotationString(segmentIndex: number, numberOfSegments: number) {
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
  } else if (numberOfSegments === 3) {
    polygonString = `polygon(
      calc(50% + ${WHEEL_GAP_IN_PX / 2}px) 50%,
      calc(100% - 21.13% + ${WHEEL_GAP_IN_PX / 2}px) 0%,
      100% 0%,
      100% 100%,
      calc(100% - 21.13% + ${WHEEL_GAP_IN_PX / 2}px) 100%
    )`;
  } else if (numberOfSegments === 4) {
    polygonString = `polygon(
      calc(50% + ${WHEEL_GAP_IN_PX / 2}px) 50%,
      100% calc(${WHEEL_GAP_IN_PX / 2}px),
      100% calc(100% - ${WHEEL_GAP_IN_PX / 2}px)
    )`;
  } else if (numberOfSegments > 4) {
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

function generateWheelSegments(labels: string[]) {
  return labels.map((label, labelIndex) => {
    const segmentElement = document.createElement<'div'>('div');
    segmentElement.classList.add('wheel-segment');

    const labelElement = document.createElement<'span'>('span');
    labelElement.classList.add('wheel-label');
    labelElement.textContent = label;

    segmentElement.appendChild(labelElement);
    segmentElement.style.transform = createSegmentRotationString(labelIndex, labels.length);
    segmentElement.style.clipPath = createSegmentClipPathString(labels.length);

    return segmentElement;
  });
}

export default function generateWheel(labels: string[]) {
  const wheelElement = document.createElement<'div'>('div');
  wheelElement.classList.add('wheel');

  const wheelSegmentElements = generateWheelSegments(labels);
  wheelSegmentElements.forEach((segmentElement) => wheelElement.appendChild(segmentElement));

  return wheelElement;
}
