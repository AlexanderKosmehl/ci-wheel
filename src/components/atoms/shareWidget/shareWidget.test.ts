import { describe, expect, it } from 'vitest';
import generateShareWidget from './shareWidget';

describe('generateShareWidget', () => {
  const shareWidget = generateShareWidget();

  it('generates component correctly', () => {
    expect(shareWidget).toMatchSnapshot();
  });
});
