import { describe, expect, it } from '@jest/globals';
import generateHeader from './header';

describe('generateHeader', () => {
  const header = generateHeader();

  it('generates component correctly', () => {
    expect(header).toMatchSnapshot();
  });
});
