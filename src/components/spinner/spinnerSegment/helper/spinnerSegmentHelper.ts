import { SPIN_BUTTON_SIZE_IN_REM, WHEEL_GAP_IN_PX } from '../../../../config';

export function createSegmentRotationString(
  segmentIndex: number,
  numberOfSegments: number,
) {
  return `rotate(${segmentIndex * (360 / numberOfSegments)}deg)`;
}

export function createSegmentClipPathString(numberOfSegments: number) {
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

export function convertRemToPixels(rem: number) {
  const fontSize = getComputedStyle(document.documentElement).fontSize || '16px';
  return rem * parseFloat(fontSize);
}

export function calculateSufficientHightLocation(numberOfSegments: number) {
  if (numberOfSegments < 3) return convertRemToPixels(SPIN_BUTTON_SIZE_IN_REM);

  const remainingAngle = 180 - 90 - (360 / numberOfSegments / 2);
  const angleInRad = remainingAngle * (Math.PI / 180);
  const requiredHight = convertRemToPixels(1.75 / 2);

  return Math.max(
    convertRemToPixels(SPIN_BUTTON_SIZE_IN_REM),
    Math.tan(angleInRad) * requiredHight,
  );
}
