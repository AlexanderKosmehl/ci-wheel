import { SPIN_DURATION_IN_SEC, WHEEL_GAP_IN_PX } from '../config';

const spinButton = document.querySelector<HTMLButtonElement>('#spin-button');
const wheelContainer = document.querySelector<HTMLDivElement>('#wheel-container');

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

function generateWheel(labels: string[]) {
  const wheelElement = document.createElement<'div'>('div');
  wheelElement.classList.add('wheel');
  wheelElement.style.transition = `${SPIN_DURATION_IN_SEC}s`;

  const wheelSegmentElements = generateWheelSegments(labels);
  wheelSegmentElements.forEach((segmentElement) => wheelElement.appendChild(segmentElement));

  return wheelElement;
}

function getElementAtDegree(degree: number, entries: string[]) {
  const segmentAngle = 360 / entries.length;
  const preparedAngle = (degree - segmentAngle / 2) % 360;
  const indexAtDegree = Math.floor((360 - preparedAngle) / segmentAngle);
  return entries[indexAtDegree];
}

export default class SpinnerComponent {
  labels: string[];

  changeHandler: () => void;

  currentAngle = 0;

  constructor(labels: string[], changeHandler: () => void) {
    this.labels = labels;
    this.changeHandler = changeHandler;

    spinButton?.addEventListener('click', () => {
      const spinner = document.querySelector('.wheel') as HTMLDivElement;
      if (!spinner) return;

      this.currentAngle += 720 + Math.random() * 360;
      spinner.style.transform = `rotate(${this.currentAngle}deg)`;

      spinButton.disabled = true;
      setTimeout(() => {
        spinButton.disabled = false;
      }, SPIN_DURATION_IN_SEC * 1000);
      getElementAtDegree(this.currentAngle, this.labels);
    });
  }

  renderWheel() {
    if (!wheelContainer || !this.labels) return;

    wheelContainer.textContent = '';
    wheelContainer.appendChild(generateWheel(this.labels));

    this.currentAngle = 0;
  }
}
