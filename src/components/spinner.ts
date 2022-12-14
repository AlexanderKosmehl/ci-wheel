import styles from './spinner.module.css';
import { SEGMENT_COLORS, SPIN_DURATION_IN_SEC, WHEEL_GAP_IN_PX } from '../config';

const wheelContainer = document.querySelector<HTMLDivElement>('#wheel-container');
wheelContainer?.classList.add(styles.container);

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
    labelElement.classList.add(styles.label);
    labelElement.textContent = label;

    segmentElement.appendChild(labelElement);
    segmentElement.classList.add(styles.segment);
    segmentElement.style.transform = createSegmentRotationString(labelIndex, labels.length);
    segmentElement.style.clipPath = createSegmentClipPathString(labels.length);
    segmentElement.style.backgroundColor = SEGMENT_COLORS[labelIndex % SEGMENT_COLORS.length];

    return segmentElement;
  });
}

function generateWheel(labels: string[]) {
  const wheelElement = document.createElement<'div'>('div');
  wheelElement.classList.add(styles.wheel);
  wheelElement.style.transition = `${SPIN_DURATION_IN_SEC}s`;

  const wheelSegmentElements = generateWheelSegments(labels);
  wheelSegmentElements.forEach((segmentElement) => wheelElement.appendChild(segmentElement));

  return wheelElement;
}

export default class SpinnerComponent {
  labels: string[];

  changeHandler: () => void;

  currentAngle = 0;

  private wheelComponent?: HTMLDivElement;

  private boundEventHandler?: () => void;

  spinnerCallback: (selectedLabel: string) => void;

  constructor(
    labels: string[],
    changeHandler: () => void,
    spinnerCallback: (selectedLabel: string) => void,
  ) {
    this.labels = labels;
    this.changeHandler = changeHandler;
    this.spinnerCallback = spinnerCallback;
  }

  render() {
    if (!wheelContainer || !this.labels) return;

    wheelContainer.textContent = '';
    const newWheelComponent = generateWheel(this.labels);
    this.wheelComponent = newWheelComponent;
    wheelContainer.appendChild(newWheelComponent);

    this.boundEventHandler = this.handleWheelClick.bind(this);
    this.wheelComponent.addEventListener('click', this.boundEventHandler);

    const tickShadow = document.createElement<'div'>('div');
    tickShadow.classList.add(styles['tick-shadow']);

    const wheelTick = document.createElement<'div'>('div');
    wheelTick.classList.add(styles.tick);
    tickShadow.appendChild(wheelTick);
    wheelContainer.appendChild(tickShadow);

    this.currentAngle = 0;
  }

  handleWheelClick() {
    if (!this.wheelComponent) return;

    this.currentAngle += 720 + Math.random() * 360;
    this.wheelComponent.style.transform = `rotate(${this.currentAngle}deg)`;

    if (this.boundEventHandler) {
      this.wheelComponent.removeEventListener('click', this.boundEventHandler);
    }
    setTimeout(() => {
      this.spinnerCallback(this.getCurrentLabel());
      if (!this.boundEventHandler) return;
      this.wheelComponent?.addEventListener('click', this.boundEventHandler);
    }, SPIN_DURATION_IN_SEC * 1000);
  }

  private getCurrentLabel() {
    const segmentAngle = 360 / this.labels.length;
    const preparedAngle = (this.currentAngle - segmentAngle / 2) % 360;
    const indexAtDegree = Math.floor((360 - preparedAngle) / segmentAngle);
    return this.labels[indexAtDegree];
  }
}
