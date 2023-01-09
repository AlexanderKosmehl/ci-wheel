import { describe, expect, it } from '@jest/globals';
import {
  calculateSufficientHightLocation,
  convertRemToPixels,
  createSegmentClipPathString,
  createSegmentRotationString,
} from './spinnerSegmentHelper';

describe('spinnerSegmentHelper', () => {
  describe('createSegmentRotationString', () => {
    it('creates correct rotation strings', () => {
      expect(createSegmentRotationString(1, 1)).toMatchSnapshot();

      expect(createSegmentRotationString(1, 2)).toMatchSnapshot();
      expect(createSegmentRotationString(2, 2)).toMatchSnapshot();

      expect(createSegmentRotationString(1, 3)).toMatchSnapshot();
      expect(createSegmentRotationString(2, 3)).toMatchSnapshot();
      expect(createSegmentRotationString(3, 3)).toMatchSnapshot();

      expect(createSegmentRotationString(1, 4)).toMatchSnapshot();
      expect(createSegmentRotationString(2, 4)).toMatchSnapshot();
      expect(createSegmentRotationString(3, 4)).toMatchSnapshot();
      expect(createSegmentRotationString(4, 4)).toMatchSnapshot();
    });
  });

  describe('createSegmentClipPathString', () => {
    it('creates correct clippath strings', () => {
      expect(createSegmentClipPathString(1));
      expect(createSegmentClipPathString(2));
      expect(createSegmentClipPathString(3));
      expect(createSegmentClipPathString(4));
      expect(createSegmentClipPathString(5));
    });
  });

  describe('convertRemToPixels', () => {
    it('calculates pixels correctly', () => {
      expect(convertRemToPixels(0.25)).toBe(4);
      expect(convertRemToPixels(0.5)).toBe(8);
      expect(convertRemToPixels(0.75)).toBe(12);
      expect(convertRemToPixels(1.0)).toBe(16);
      expect(convertRemToPixels(1.25)).toBe(20);
    });
  });

  describe('calculateSufficientHightLocation', () => {
    it('calculates location correctly', () => {
      expect(calculateSufficientHightLocation(1)).toMatchSnapshot();
      expect(calculateSufficientHightLocation(2)).toMatchSnapshot();
      expect(calculateSufficientHightLocation(3)).toMatchSnapshot();
      expect(calculateSufficientHightLocation(5)).toMatchSnapshot();
      expect(calculateSufficientHightLocation(8)).toMatchSnapshot();
      expect(calculateSufficientHightLocation(13)).toMatchSnapshot();
      expect(calculateSufficientHightLocation(21)).toMatchSnapshot();
    });
  });
});
