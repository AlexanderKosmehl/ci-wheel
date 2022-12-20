import { describe, expect, it } from '@jest/globals';
import generateSpinnerSegments from './spinnerSegments';

describe('generateSpinnerSegments', () => {
  const labels = ['Test', 'Test2'];
  const spinnerSegments = generateSpinnerSegments(labels);

  it('generates components correctly', () => {
    expect(spinnerSegments.length).toBe(labels.length);
    expect(spinnerSegments).toMatchSnapshot();
  });
});
